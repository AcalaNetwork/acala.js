import { FixedPointNumber } from '@acala-network/sdk-core';
import { request, gql } from 'graphql-request';
import { BaseHistoryFetcher } from '../base-history-fetcher.js';
import { BaseFetchParams, HistoryFetcherConfig, HistoryRecord } from '../types.js';
import { resolveLinks } from '../utils/resolve-links.js';
import { getChainType } from '../../utils/get-chain-type.js';

export interface LoanFetchParams extends BaseFetchParams {
  address: string;
}

interface updatePositionsNode {
  id: string;
  ownerId: string;
  collateralId: string;
  collateralAdjustment: string;
  debitAdjustment: string;
  collateralAdjustmentUSD: string;
  debitAdjustmentUSD: string;
  debitExchangeRate: string;
  blockId: string;
  isDerived: boolean;
  extrinsicId: string;
  timestamp: Date;
}

interface liquidUnsavesNode {
  id: string;
  collateralId: string;
  collateralAmount: string;
  collateralVolumeUSD: string;
  badDebitVolumeUSD: string;
  liquidationStrategy: string;
  blockId: string;
  extrinsicId: string;
  debitExchangeRate: string;
  timestamp: Date;
}

interface closeByDexNode {
  id: string;
  collateralId: string;
  debitVolumeUSD: string;
  soldAmount: string;
  refundAmount: string;
  blockId: string;
  extrinsicId: string;
  debitExchangeRate: string;
  timestamp: Date;
}

interface FetchResult {
  updatePositions: {
    nodes: updatePositionsNode[];
  };
  liquidUnsaves: {
    nodes: liquidUnsavesNode[];
  };
  closeByDexes: {
    nodes: closeByDexNode[];
  };
}

export class Loans extends BaseHistoryFetcher<LoanFetchParams> {
  constructor(configs: HistoryFetcherConfig) {
    super(configs);
  }

  async fetch(params: LoanFetchParams): Promise<HistoryRecord[]> {
    const variables: Record<string, string> = {
      account: params.address
    };

    const paramsSchema = `$account: String`;
    const updatePositionFilterSchema = `filter: { ownerId: { equalTo: $account }, isDerived: {equalTo: false} }`;
    const filterSchema = `filter: { ownerId: { equalTo: $account } }`;
    const updatePositionsResultShema = `
      nodes {
        id
        ownerId
        collateralId
        collateralAdjustment
        debitAdjustment
        collateralAdjustmentUSD
        debitAdjustmentUSD
        debitExchangeRate
        isDerived
        blockId
        extrinsicId
        timestamp
      }
    `;
    const liquidUnsavesResultShema = `
      nodes {
        id
        collateralId
        collateralAmount
        collateralVolumeUSD
        badDebitVolumeUSD
        liquidationStrategy
        debitExchangeRate
        blockId
        extrinsicId
        timestamp
      }
    `;

    const closeByDexParams = `
      nodes {
        id
        collateralId
        debitVolumeUSD
        soldAmount
        refundAmount
        blockId
        extrinsicId
        debitExchangeRate
        timestamp
      }
    `;

    const result = await request<FetchResult>(
      this.configs.endpoint,
      gql`
        query(${paramsSchema}){
          updatePositions(
            ${updatePositionFilterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${updatePositionsResultShema}
          }
          liquidUnsaves(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${liquidUnsavesResultShema}
          }
          closeByDexes(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${closeByDexParams}
          }
        }
      `,
      variables
    );

    return this.transform(result);
  }

  private transform(data: FetchResult): HistoryRecord[] {
    const updatePositions = data.updatePositions.nodes.map((item) => {
      return {
        data: item,
        message: this.createUpdateMessage(item),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsicId,
          item.blockId
        ),
        method: 'loans.PositionUpdated',
        extrinsicHash: item.extrinsicId,
        blockNumber: item.blockId
      };
    });

    const liquidUnsaves = data.liquidUnsaves.nodes.map((item) => {
      return {
        data: item,
        message: this.createLiquidityMessage(item),
        // ignore the extrinsic of liquid unsafes position event for that subscan can't resolve the link correctly
        resolveLinks: resolveLinks(getChainType(this.configs.wallet.consts.runtimeChain), undefined, item.blockId),
        method: 'cdpEngine.LiquidateUnsafeCDP',
        extrinsicHash: '',
        blockNumber: item.blockId
      };
    });

    const closeByDexes = data.closeByDexes.nodes.map((item) => {
      return {
        data: item,
        message: this.createCloseByDexMessage(item),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsicId,
          item.blockId
        ),
        method: 'loans.CloseCDPInDebitByDEX',
        extrinsicHash: item.extrinsicId,
        blockNumber: item.blockId
      };
    });

    return updatePositions
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .concat(liquidUnsaves as unknown as any)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .concat(closeByDexes as unknown as any)
      .sort((a, b) => (new Date(b.data.timestamp) < new Date(a.data.timestamp) ? -1 : 1))
      .slice(0, 20);
  }

  private createUpdateMessage(data: updatePositionsNode) {
    const collateralToken = this.configs.wallet.getToken(data.collateralId);
    const { stableToken } = this.configs.wallet.getPresetTokens();
    const collateral = FixedPointNumber.fromInner(data.collateralAdjustment, collateralToken?.decimals);
    const debit = FixedPointNumber.fromInner(data.debitAdjustment).times(
      FixedPointNumber.fromInner(data.debitExchangeRate)
    );
    debit.forceSetPrecision(stableToken?.decimals || 12);

    if (collateral.lt(FixedPointNumber.ZERO)) {
      return `Withdraw ${FixedPointNumber.ZERO.minus(collateral).toNumber(6)} ${collateralToken?.display}`;
    }

    if (collateral.isGreaterThan(FixedPointNumber.ZERO)) {
      return `Deposit ${collateral.toNumber(6)} ${collateralToken?.display}`;
    }

    if (debit.isGreaterThan(FixedPointNumber.ZERO)) {
      return `Mint ${debit.toNumber(6)} ${stableToken?.display}`;
    }

    if (debit.lt(FixedPointNumber.ZERO)) {
      return `Payback ${FixedPointNumber.ZERO.minus(debit).toNumber(6)} ${stableToken?.display}`;
    }

    return 'parse history data failed';
  }

  private createCloseByDexMessage(data: closeByDexNode) {
    const collateralToken = this.configs.wallet.getToken(data.collateralId);
    const { stableToken } = this.configs.wallet.getPresetTokens();
    const collateral = FixedPointNumber.fromInner(data.refundAmount, collateralToken.decimals || 12).add(
      FixedPointNumber.fromInner(data.soldAmount, collateralToken.decimals || 12)
    );
    const debit = FixedPointNumber.fromInner(data.debitVolumeUSD, stableToken?.decimals);
    return `${collateralToken?.display} position(${collateral.toNumber(6)} ${
      collateralToken?.display
    }, $${debit.toNumber(6)} ${stableToken?.display}) had been closed by dex`;
  }

  private createLiquidityMessage(data: liquidUnsavesNode) {
    const collateralToken = this.configs.wallet.getToken(data.collateralId);
    const { stableToken } = this.configs.wallet.getPresetTokens();
    const collateral = FixedPointNumber.fromInner(data.collateralAmount, collateralToken?.decimals);
    const liquidationStrategy = FixedPointNumber.fromInner(data.liquidationStrategy, stableToken.decimals);
    const debit = FixedPointNumber.fromInner(data.badDebitVolumeUSD);

    return `${collateralToken?.display} position(${collateral.toNumber(6)} ${
      collateralToken?.display
    }, ${debit.toNumber(6)} ${stableToken?.display}) had been liquidated through ${liquidationStrategy.toNumber(6)} ${
      stableToken.display
    }`;
  }
}

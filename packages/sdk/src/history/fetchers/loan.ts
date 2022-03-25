import { FixedPointNumber } from '@acala-network/sdk-core';
import { request, gql } from 'graphql-request';
import { BaseHistoryFetcher } from '../base-history-fetcher';
import { BaseFetchParams, HistoryFetcherConfig, HistoryRecord } from '../types';
import { resolveLinks } from '../utils/resolve-links';
import { getChainType } from '../../utils/get-chain-type';

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

interface FetchResult {
  updatePositions: {
    nodes: updatePositionsNode[];
  };
  liquidUnsaves: {
    nodes: liquidUnsavesNode[];
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

    const result = await request<FetchResult>(
      this.configs.endpoint,
      gql`
        query(${paramsSchema}){
          updatePositions(
            ${filterSchema}
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
        extrinsicHash: item.extrinsicId,
        blockNumber: item.blockId
      };
    });

    const liquidUnsaves = data.liquidUnsaves.nodes.map((item) => {
      return {
        data: item,
        message: this.createLiquidityMessage(item),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsicId,
          item.blockId
        ),
        extrinsicHash: item.extrinsicId,
        blockNumber: item.blockId
      };
    });

    return updatePositions
      .concat(liquidUnsaves as any)
      .sort((a, b) => (new Date(b.data.timestamp) < new Date(a.data.timestamp) ? -1 : 1))
      .slice(0, 20);
  }

  private createUpdateMessage(data: updatePositionsNode) {
    const collateralToken = this.configs.wallet.__getToken(data.collateralId);
    const { stableToken } = this.configs.wallet.getPresetTokens();
    const collateral = FixedPointNumber.fromInner(data.collateralAdjustment, collateralToken?.decimals);
    const debit = FixedPointNumber.fromInner(data.debitAdjustment).times(
      FixedPointNumber.fromInner(data.debitExchangeRate.toString())
    );
    debit.forceSetPrecision(stableToken?.decimals || 12);

    if (collateral.lt(FixedPointNumber.ZERO)) {
      return `Withdraw ${FixedPointNumber.ZERO.minus(collateral).toString(6)} ${data.collateralId}`;
    }

    if (collateral.isGreaterThan(FixedPointNumber.ZERO)) {
      return `Deposit ${collateral.toString(6)} ${data.collateralId}`;
    }

    if (debit.isGreaterThan(FixedPointNumber.ZERO)) {
      return `Mint ${debit.toString(6)} ${stableToken?.display}`;
    }

    if (debit.lt(FixedPointNumber.ZERO)) {
      return `Payback ${FixedPointNumber.ZERO.minus(debit).toString(6)} ${stableToken?.display}`;
    }

    return 'parse history data failed';
  }

  private createLiquidityMessage(data: liquidUnsavesNode) {
    const collateralToken = this.configs.wallet.__getToken(data.collateralId);
    const { stableToken } = this.configs.wallet.getPresetTokens();
    const collateral = FixedPointNumber.fromInner(data.collateralAmount, collateralToken?.decimals);
    const debit = FixedPointNumber.fromInner(data.badDebitVolumeUSD, stableToken?.decimals);
    debit.forceSetPrecision(stableToken?.decimals || 12);
    return `${data.collateralId} position(${collateral.toString(6)} ${data.collateralId}, ${debit.toString(6)} ${
      stableToken?.display
    }) had been liquidated through ${data.liquidationStrategy}`;
  }
}

import { FixedPointNumber, forceToCurrencyName } from '@acala-network/sdk-core';
import { request, gql } from 'graphql-request';
import { BaseHistoryFetcher } from '../base-history-fetcher';
import { BaseFetchParams, HistoryFetcherConfig, HistoryRecord } from '../types';
import { resolveLinks } from '../utils/resolve-links';
import { getChainType } from '../../utils/get-chain-type';

export interface EarnFetchParams extends BaseFetchParams {
  address: string;
}

interface Node {
  id: string;
  addressId: string;
  blockId: string;
  extrinsicId: string;
  timestamp: string;
  tokenId: string;
  // DepositDexShare or WithdrawDexShare
  amount?: string;
  // PayoutRewards
  pool?: string;
  rewardCurrencyType?: string;
  actualPayout?: string;
  deductionAmount?: string;
  // ClaimRewards
  actualAmount?: string;
}

interface FetchResult {
  payoutRewards: {
    nodes: Node[];
  };
  claimRewards: {
    nodes: Node[];
  };
  depositDexShares: {
    nodes: Node[];
  };
  withdrawDexShares: {
    nodes: Node[];
  };
}

export class Earns extends BaseHistoryFetcher<EarnFetchParams> {
  constructor(configs: HistoryFetcherConfig) {
    super(configs);
  }

  async fetch(params: EarnFetchParams): Promise<HistoryRecord[]> {
    const variables: Record<string, string> = {
      account: params.address
    };

    const paramsSchema = `$account: String`;
    const filterSchema = `filter: { addressId: { equalTo: $account } }`;
    const claimRewardsResultShema = `
      nodes {
        id
        addressId
        tokenId
        pool
        actualAmount
        deductionAmount
        blockId
        extrinsicId
        timestamp
      }
    `;
    const payoutRewardsResultShema = `
      nodes {
        id
        addressId
        tokenId
        pool
        actualPayout
        deductionAmount
        blockId
        extrinsicId
        timestamp
      }
    `;
    const depositAndwithdrawResultShema = `
      nodes {
        id
        addressId
        tokenId
        amount
        blockId
        extrinsicId
        timestamp
      }
    `;

    const result = await request<FetchResult>(
      this.configs.endpoint,
      gql`
        query(${paramsSchema}){
          claimRewards(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${claimRewardsResultShema}
          }
          payoutRewards(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${payoutRewardsResultShema}
          }
          depositDexShares(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${depositAndwithdrawResultShema}
          }
          withdrawDexShares(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${depositAndwithdrawResultShema}
          }
        }
      `,
      variables
    );

    return this.transform(result);
  }

  private transform(data: FetchResult): HistoryRecord[] {
    const claimRewards = data.claimRewards.nodes.map((item) => {
      return {
        data: item,
        message: this.createMessage('claimRewards', item),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsicId,
          item.blockId
        ),
        method: 'incentives.ClaimRewards',
        extrinsicHash: item.extrinsicId,
        blockNumber: item.blockId
      };
    });
    const payoutRewards = data.payoutRewards.nodes.map((item) => {
      return {
        data: item,
        message: this.createMessage('payoutRewards', item),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsicId,
          item.blockId
        ),
        method: 'incentives.PayoutRewards',
        extrinsicHash: item.extrinsicId,
        blockNumber: item.blockId
      };
    });

    const depositDexShares = data.depositDexShares.nodes.map((item) => {
      return {
        data: item,
        message: this.createMessage('depositDexShares', item),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsicId,
          item.blockId
        ),
        method: 'incentives.DepositDexShare',
        extrinsicHash: item.extrinsicId,
        blockNumber: item.blockId
      };
    });

    const withdrawDexShares = data.withdrawDexShares.nodes.map((item) => {
      return {
        data: item,
        message: this.createMessage('withdrawDexShares', item),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsicId,
          item.blockId
        ),
        method: 'incentives.WithdrawDexShare',
        extrinsicHash: item.extrinsicId,
        blockNumber: item.blockId
      };
    });

    return claimRewards
      .concat(payoutRewards)
      .concat(withdrawDexShares)
      .concat(depositDexShares)
      .sort((a, b) => (new Date(b.data.timestamp) < new Date(a.data.timestamp) ? -1 : 1))
      .slice(0, 20);
  }

  private getPoolId = (pool?: string) => {
    return pool?.includes('-') ? this.configs.wallet.__getToken(pool.split('-')[1])?.display : pool;
  };

  private createMessage(type: string, data: Node) {
    const token = this.configs.wallet.__getToken(forceToCurrencyName(data.tokenId));

    if (type === 'claimRewards') {
      const amount = FixedPointNumber.fromInner(data.actualAmount || '0', token?.decimals || 12).toNumber(6);
      const poolId = this.getPoolId(data.pool);
      return `Claim ${amount} ${token?.display} from ${poolId || ''} earn pool`;
    } else if (type === 'payoutRewards') {
      const poolId = this.getPoolId(data.pool);
      const amount = FixedPointNumber.fromInner(data.actualPayout || '0', token?.decimals || 12).toNumber(6);
      return `Claim ${amount} ${token?.display} from ${poolId || ''} earn pool`;
    } else if (type === 'depositDexShares') {
      const amount = FixedPointNumber.fromInner(data.amount || '0', token?.decimals || 12).toNumber(6);
      return `Add ${amount} shares to ${token?.display} earn pool`;
    } else if (type === 'withdrawDexShares') {
      const amount = FixedPointNumber.fromInner(data.amount || '0', token?.decimals || 12).toNumber(6);
      return `Remove ${amount} shares from ${token?.display} earn pool`;
    } else {
      return 'parse history data failed';
    }
  }
}

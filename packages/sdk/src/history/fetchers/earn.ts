/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { FixedPointNumber, forceToCurrencyName } from '@acala-network/sdk-core';
import { request, gql } from 'graphql-request';
import { BaseHistoryFetcher } from '../base-history-fetcher.js';
import { BaseFetchParams, HistoryFetcherConfig, HistoryRecord } from '../types.js';
import { resolveLinks } from '../utils/resolve-links.js';
import { getChainType } from '../../utils/get-chain-type.js';

export interface EarnFetchParams extends BaseFetchParams {
  address: string;
}

interface Node {
  id: string;
  addressId: string;
  blockNumber: string;
  extrinsic: string;
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

interface EarnFetcherConfigs extends HistoryFetcherConfig {
  stakingEndpoint: string;
}

export class Earns extends BaseHistoryFetcher<EarnFetchParams> {
  private stakingEndpoint!: string;

  constructor(configs: EarnFetcherConfigs) {
    super(configs);

    this.stakingEndpoint = configs.stakingEndpoint;
  }

  async fetchStaking(params: EarnFetchParams): Promise<HistoryRecord[]> {
    const variables: Record<string, string> = {
      account: params.address
    };

    const paramsSchema = `$account: String`;
    const filterSchema = `filter: { address: { equalTo: $account } }`;

    const result = await request<FetchResult>(
      this.stakingEndpoint,
      gql`
        query(${paramsSchema}){
          bondeds(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            nodes {
              amount
              address
              timestamp
              block
              extrinsic
            }
          }
          unbondeds(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            nodes {
              amount
              address
              timestamp
              block
              extrinsic
            }
          }
          rebondeds(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            nodes {
              amount
              address
              timestamp
              block
              extrinsic
            }
          }
          withdrawns(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            nodes {
              amount
              address
              timestamp
              block
              extrinsic
            }
          }
        }
      `,
      variables
    );

    return this.transformStaking(result);
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
        blockNumber
        extrinsic
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
        blockNumber
        extrinsic
        timestamp
      }
    `;
    const depositAndwithdrawResultShema = `
      nodes {
        id
        addressId
        tokenId
        amount
        blockNumber
        extrinsic
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

    const stakingHistory = await this.fetchStaking(params);

    return this.transform(result)
      .concat(stakingHistory)
      .sort((a, b) => (new Date(b.data.timestamp) < new Date(a.data.timestamp) ? -1 : 1))
      .slice(0, 20);
  }

  private transformStaking(data: any): HistoryRecord[] {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const bonded = data.bondeds.nodes.map((item: any) => {
      return {
        data: item,
        message: this.createMessage('aca-staking-bonded', item),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsic,
          item.blockNumber
        ),
        method: 'earning.Bonded',
        extrinsicHash: item.extrinsic,
        blockNumber: item.blockNumber,
        timestamp: item.timestamp
      };
    });
    const unbonded = data.unbondeds.nodes.map((item) => {
      return {
        data: item,
        message: this.createMessage('aca-staking-unbonded', item),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsic,
          item.blockNumber
        ),
        method: 'earning.Unbonded',
        extrinsicHash: item.extrinsic,
        blockNumber: item.blockNumber,
        timestamp: item.timestamp
      };
    });
    const rebonded = data.rebondeds.nodes.map((item) => {
      return {
        data: item,
        message: this.createMessage('aca-staking-rebonded', item),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsic,
          item.blockNumber
        ),
        method: 'earning.Rebonded',
        extrinsicHash: item.extrinsic,
        blockNumber: item.blockNumber,
        timestamp: item.timestamp
      };
    });
    const withdrawns = data.withdrawns.nodes.map((item) => {
      return {
        data: item,
        message: this.createMessage('aca-staking-withdrawn', item),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsic,
          item.blockNumber
        ),
        method: 'earning.Withdrawn',
        extrinsicHash: item.extrinsic,
        blockNumber: item.blockNumber,
        timestamp: item.timestamp
      };
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return bonded
      .concat(unbonded)
      .concat(rebonded)
      .concat(withdrawns)
      .sort((a, b) => (new Date(b.data.timestamp) < new Date(a.data.timestamp) ? -1 : 1));
  }

  private transform(data: FetchResult): HistoryRecord[] {
    const claimRewards = data.claimRewards.nodes.map((item) => {
      return {
        data: item,
        message: this.createMessage('claimRewards', item),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsic,
          item.blockNumber
        ),
        method: 'incentives.ClaimRewards',
        extrinsicHash: item.extrinsic,
        blockNumber: item.blockNumber,
        timestamp: item.timestamp
      };
    });
    const payoutRewards = data.payoutRewards.nodes.map((item) => {
      return {
        data: item,
        message: this.createMessage('payoutRewards', item),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsic,
          item.blockNumber
        ),
        method: 'incentives.PayoutRewards',
        extrinsicHash: item.extrinsic,
        blockNumber: item.blockNumber,
        timestamp: item.timestamp
      };
    });

    const depositDexShares = data.depositDexShares.nodes.map((item) => {
      return {
        data: item,
        message: this.createMessage('depositDexShares', item),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsic,
          item.blockNumber
        ),
        method: 'incentives.DepositDexShare',
        extrinsicHash: item.extrinsic,
        blockNumber: item.blockNumber,
        timestamp: item.timestamp
      };
    });

    const withdrawDexShares = data.withdrawDexShares.nodes.map((item) => {
      return {
        data: item,
        message: this.createMessage('withdrawDexShares', item),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsic,
          item.blockNumber
        ),
        method: 'incentives.WithdrawDexShare',
        extrinsicHash: item.extrinsic,
        blockNumber: item.blockNumber,
        timestamp: item.timestamp
      };
    });

    return claimRewards
      .concat(payoutRewards)
      .concat(withdrawDexShares)
      .concat(depositDexShares)
      .sort((a, b) => (new Date(b.data.timestamp) < new Date(a.data.timestamp) ? -1 : 1));
  }

  private getPoolId = (pool?: string) => {
    return pool?.includes('-') ? this.configs.wallet.getToken(pool.split('-')[1])?.display : pool;
  };

  private createMessage(type: string, data: Node) {
    const token = data.tokenId ? this.configs.wallet.getToken(forceToCurrencyName(data.tokenId)) : undefined;
    const nativeToken = this.configs.wallet.getPresetTokens()?.nativeToken;

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
    } else if (type === 'aca-staking-bonded') {
      const amount = FixedPointNumber.fromInner(data.amount || '0', nativeToken?.decimals).toNumber(6);
      return `Bond ${amount} ${nativeToken?.display} to ${nativeToken?.display} staking pool`;
    } else if (type === 'aca-staking-unbonded') {
      const amount = FixedPointNumber.fromInner(data.amount || '0', nativeToken?.decimals).toNumber(6);
      return `Unbond ${amount} ${nativeToken?.display} from ${nativeToken?.display} staking pool`;
    } else if (type === 'aca-staking-rebonded') {
      const amount = FixedPointNumber.fromInner(data.amount || '0', nativeToken?.decimals).toNumber(6);
      return `Rebond ${amount} ${nativeToken?.display} to ${nativeToken?.display} staking pool`;
    } else if (type === 'aca-staking-withdrawn') {
      const amount = FixedPointNumber.fromInner(data.amount || '0', nativeToken?.decimals).toNumber(6);
      return `Withdraw ${amount} ${nativeToken?.display} from ${nativeToken?.display} staking pool`;
    } else {
      return 'parse history data failed';
    }
  }
}

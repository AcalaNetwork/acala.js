import { FixedPointNumber, forceToCurrencyName, MaybeCurrency } from '@acala-network/sdk-core';
import { request, gql } from 'graphql-request';
import { BaseHistoryFetcher } from '../base-history-fetcher.js';
import { BaseFetchParams, HistoryFetcherConfig, HistoryRecord } from '../types.js';
import { resolveLinks } from '../utils/resolve-links.js';
import { truncateAddress } from '../utils/truncate-address.js';
import { getChainType } from '../../utils/get-chain-type.js';

export interface TransfersFetchParams extends BaseFetchParams {
  address: string;
  token?: MaybeCurrency;
}

interface FetchResult {
  transfers: {
    nodes: {
      id: string;
      fromId: string;
      toId: string;
      tokenId: string;
      blockNumber: string;
      amount: string;
      extrinsic: string;
      timestamp: Date;
    }[];
  };
}

export class Transfers extends BaseHistoryFetcher<TransfersFetchParams> {
  constructor(configs: HistoryFetcherConfig) {
    super(configs);
  }

  async fetch(params: TransfersFetchParams): Promise<HistoryRecord[]> {
    const variables: Record<string, string> = {
      account: params.address
    };

    if (params.token) {
      variables.token = forceToCurrencyName(params.token);
    }

    const paramsSchema = `$account: String ${params.token ? ',$token: String' : ''}`;
    const filterSchema = `
      filter: {
        isSystemCall: { equalTo: false }
        ${params.token ? 'tokenId: { equalTo: $token } ' : ''}
        or: [{ fromId: { equalTo: $account } }, { toId: { equalTo: $account } }]
      }
    `;
    const resultShema = `
      nodes {
        id
        fromId
        toId
        tokenId
        blockNumber
        amount
        extrinsic
        timestamp
      }
    `;

    const result = await request<FetchResult>(
      this.configs.endpoint,
      gql`
        query (${paramsSchema}) {
          transfers(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${resultShema}
          }
        }
      `,
      variables
    );

    return this.transform(result);
  }

  private transform(data: FetchResult): HistoryRecord[] {
    if (data?.transfers?.nodes?.length) {
      return data.transfers.nodes.map((item) => {
        return {
          data: {
            from: item.fromId,
            to: item.toId,
            amount: item.amount,
            token: item.tokenId,
            timestamp: item.timestamp
          },
          message: this.createMessage(item.fromId, item.toId, item.tokenId, item.amount),
          resolveLinks: resolveLinks(
            getChainType(this.configs.wallet.consts.runtimeChain),
            item.extrinsic,
            item.blockNumber
          ),
          method: 'balances.Transfer',
          extrinsicHash: item.extrinsic,
          blockNumber: item.blockNumber
        };
      });
    }

    return [];
  }

  private createMessage(from: string, to: string, tokenName: string, balance: string) {
    const current = this.fetchParams?.address;
    const token = this.configs.wallet.getToken(tokenName);
    const amount = FixedPointNumber.fromInner(balance, token?.decimals).toNumber(6);

    let action = '';

    if (from === current) {
      action = `Send ${amount} ${token?.display} to ${truncateAddress(to)}`;
    }

    if (to === current) {
      action = `Receive ${amount} ${token?.display} from ${truncateAddress(from)}`;
    }

    return action;
  }
}

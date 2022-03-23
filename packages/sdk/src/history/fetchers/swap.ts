import { createDexShareName, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { request, gql } from 'graphql-request';
import { BaseHistoryFetcher } from '../base-history-fetcher';
import { BaseFetchParams, HistoryFetcherConfig, HistoryRecord } from '../types';
import { resolveLinks } from '../utils/resolve-links';
import { getChainType } from '../../utils/get-chain-type';

export interface SwapFetchParams extends BaseFetchParams {
  address: string;
}

interface Node {
  id: string;
  token0Id: string;
  token1Id: string;
  token0Amount: string;
  token1Amount: string;
  // only in Swap
  token0InAmount?: string;
  token1OutAmount?: string;
  // only in RemoveLiquidity
  shareAmount?: string;
  blockId: string;
  extrinsicId: string;
  timestamp: Date;
}

interface FetchResult {
  swaps: {
    nodes: Node[];
  };
  addLiquidities: {
    nodes: Node[];
  };
  addProvisions: {
    nodes: Node[];
  };
  removeLiquidities: {
    nodes: Node[];
  };
}

export class Transfers extends BaseHistoryFetcher<SwapFetchParams> {
  constructor(configs: HistoryFetcherConfig) {
    super(configs);
  }

  async fetch(params: SwapFetchParams): Promise<HistoryRecord[]> {
    const variables: Record<string, string> = {
      account: params.address
    };

    const filterSchema = `filter: { addressId: { equalTo: $account } }`;
    const resultShema = `
      nodes {
        id
        token0Id
        token1Id
        token0Amount
        token1Amount
        blockId
        extrinsicId
        timestamp
      }
    `;
    const swapResultShema = `
      nodes {
        id
        token0Id
        token1Id
        token0InAmount
        token1OutAmount
        blockId
        extrinsicId
        timestamp
      }
    `;

    const result = await request<FetchResult>(
      this.configs.endpoint,
      gql`
        query{
          swaps(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${swapResultShema}
          }
          addLiquidities(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${resultShema}
          }
          addProvisions(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${resultShema}
          }
          addLiquidities(
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

  private transform({ addLiquidities, addProvisions, removeLiquidities, swaps }: FetchResult): HistoryRecord[] {
    const sortedNodes = addLiquidities.nodes
      .map((node) => Object.assign(node, { type: 'addLiquidity' }))
      .concat(addProvisions.nodes.map((node) => Object.assign(node, { type: 'addProvision' })))
      .concat(
        removeLiquidities.nodes.map((node) => {
          return {
            type: 'removeLiquidity',
            id: node.id,
            token0Id: node.token0Id,
            token1Id: node.token1Id,
            token0Amount: node.token0Amount,
            token1Amount: node.token1Amount,
            blockId: node.blockId,
            extrinsicId: node.extrinsicId,
            timestamp: node.timestamp
          };
        })
      )
      .concat(
        swaps.nodes.map((node) => {
          return {
            type: 'swap',
            id: node.id,
            token0Id: node.token0Id,
            token1Id: node.token1Id,
            token0Amount: node.token0InAmount || '0',
            token1Amount: node.token1OutAmount || '0',
            blockId: node.blockId,
            extrinsicId: node.extrinsicId,
            timestamp: node.timestamp
          };
        })
      )
      .sort((a, b) => (new Date(b.timestamp) < new Date(a.timestamp) ? -1 : 1))
      .slice(0, 20);

    if (sortedNodes.length) {
      return sortedNodes.map((item) => {
        return {
          data: {
            token0Id: item.token0Id,
            token1Id: item.token1Id,
            token0Amount: item.token0Amount,
            token1Amount: item.token1Amount,
            shareAmount: item.shareAmount || ''
          },
          message: this.createMessage(
            item.type,
            item.token0Id,
            item.token1Id,
            item.token0Amount,
            item.token1Amount,
            item.shareAmount
          ),
          resolveLinks: resolveLinks(
            getChainType(this.configs.wallet.consts.runtimeChain),
            item.extrinsicId,
            item.blockId
          ),
          extrinsicHash: item.extrinsicId,
          blockNumber: item.blockId
        };
      });
    }

    return [];
  }

  private createMessage(
    type: string,
    token0Id: string,
    token1Id: string,
    token0Amount: string,
    token1Amount: string,
    shareAmount?: string
  ) {
    const token0 = this.configs.wallet.__getToken(token0Id);
    const token1 = this.configs.wallet.__getToken(token1Id);
    const amount0 = FixedPointNumber.fromInner(token0Amount, token0?.decimals).toString(6);
    const amount1 = FixedPointNumber.fromInner(token1Amount, token1?.decimals).toString(6);

    if (type === 'swap') {
      return `Supply ${amount0} ${token0Id} for ${amount1} ${token1Id}`;
    } else if (type === 'addLiquidity') {
      return `Add ${amount0} ${token0Id} + ${amount1} ${token1Id} to pool`;
    } else if (type === 'removeLiquidity') {
      const [_t0, _t1] = Token.sortTokenNames(token0Id, token1Id);
      const shareTokenName = createDexShareName(_t0, _t1);
      const shareToken = this.configs.wallet.__getToken(shareTokenName);
      const amount = FixedPointNumber.fromInner(shareAmount || '0', shareToken?.decimals).toString(6);
      return `Remove ${amount} shares from ${shareTokenName} pool`;
    } else if (type === 'addProvision') {
      return `Add ${amount0} ${token0Id} + ${amount1} ${token1Id} in bootstrap`;
    } else {
      return 'parse history data failed';
    }
  }
}

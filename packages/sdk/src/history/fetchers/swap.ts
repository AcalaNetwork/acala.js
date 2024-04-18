import { createDexShareName, FixedPointNumber, Token } from '@acala-network/sdk-core';
import { request, gql } from 'graphql-request';
import { BaseHistoryFetcher } from '../base-history-fetcher.js';
import { BaseFetchParams, HistoryFetcherConfig, HistoryRecord } from '../types.js';
import { resolveLinks } from '../utils/resolve-links.js';
import { getChainType } from '../../utils/get-chain-type.js';

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

export class Swaps extends BaseHistoryFetcher<SwapFetchParams> {
  constructor(configs: HistoryFetcherConfig) {
    super(configs);
  }

  async fetch(params: SwapFetchParams): Promise<HistoryRecord[]> {
    const variables: Record<string, string> = {
      account: params.address
    };

    const paramsSchema = `$account: String`;
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
    const removeShema = `
      nodes {
        id
        token0Id
        token1Id
        token0Amount
        token1Amount
        shareAmount
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
        query(${paramsSchema}){
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
          removeLiquidities(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${removeShema}
          }
        }
      `,
      variables
    );

    return this.transform(result);
  }

  private transform({ addLiquidities, addProvisions, removeLiquidities, swaps }: FetchResult): HistoryRecord[] {
    const sortedNodes = addLiquidities.nodes
      .map((node) => Object.assign(node, { type: 'AddLiquidity' }))
      .concat(addProvisions.nodes.map((node) => Object.assign(node, { type: 'AddProvision' })))
      .concat(
        removeLiquidities.nodes.map((node) => {
          return {
            type: 'RemoveLiquidity',
            id: node.id,
            token0Id: node.token0Id,
            token1Id: node.token1Id,
            token0Amount: node.token0Amount,
            token1Amount: node.token1Amount,
            shareAmount: node.shareAmount,
            blockId: node.blockId,
            extrinsicId: node.extrinsicId,
            timestamp: node.timestamp
          };
        })
      )
      .concat(
        swaps.nodes.map((node) => {
          return {
            type: 'Swap',
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
            shareAmount: item.shareAmount || '',
            timestamp: item.timestamp
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
          method: `dex.${item.type}`,
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
    const token0 = this.configs.wallet.getToken(token0Id);
    const token1 = this.configs.wallet.getToken(token1Id);
    const amount0 = FixedPointNumber.fromInner(token0Amount, token0?.decimals).toNumber(6);
    const amount1 = FixedPointNumber.fromInner(token1Amount, token1?.decimals).toNumber(6);

    if (type === 'Swap') {
      return `Supply ${amount0} ${token0?.display} for ${amount1} ${token1?.display}`;
    } else if (type === 'AddLiquidity') {
      return `Add ${amount0} ${token0?.display} + ${amount1} ${token1?.display} to pool`;
    } else if (type === 'RemoveLiquidity') {
      const [_t0, _t1] = Token.sortTokenNames(token0Id, token1Id);
      const shareTokenName = createDexShareName(_t0, _t1);
      const shareToken = this.configs.wallet.getToken(shareTokenName);
      const amount = FixedPointNumber.fromInner(shareAmount || '0', shareToken?.decimals).toNumber(6);
      return `Remove ${amount} shares from ${shareToken?.display} pool`;
    } else if (type === 'AddProvision') {
      return `Add ${amount0} ${token0?.display} + ${amount1} ${token1?.display} in bootstrap`;
    } else {
      return 'parse history data failed';
    }
  }
}

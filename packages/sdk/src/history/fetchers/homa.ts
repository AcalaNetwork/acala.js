import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import { request, gql } from 'graphql-request';
import { BaseHistoryFetcher } from '../base-history-fetcher';
import { BaseFetchParams, HistoryFetcherConfig, HistoryRecord } from '../types';
import { resolveLinks } from '../utils/resolve-links';
import { getChainType } from '../../utils/get-chain-type';

export interface HomaFetchParams extends BaseFetchParams {
  address: string;
}

interface FetchResult {
  requestedRedeems: {
    nodes: {
      id: string;
      addressId: string;
      amount: string;
      allowFastMatch: string;
      blockId: string;
      extrinsicId: string;
      timestamp: string;
    }[];
  };
  redeemRequesteds: {
    nodes: {
      id: string;
      addressId: string;
      amount: string;
      extraFee: string;
      blockId: string;
      extrinsicId: string;
      timestamp: string;
    }[];
  };
  mints: {
    nodes: {
      id: string;
      addressId: string;
      amountStaked: string;
      amountMinted: string;
      stakingCurrencyAmount: string;
      liquidAmountReceived: string;
      liquidAmountAddedToVoid: string;
      blockId: string;
      extrinsicId: string;
      timestamp: string;
    }[];
  };
  redeemRequestCancelleds: {
    nodes: {
      id: string;
      addressId: string;
      amount: string;
      blockId: string;
      extrinsicId: string;
      timestamp: string;
    }[];
  };
  redeemeds: {
    nodes: {
      id: string;
      addressId: string;
      stakingAmountRedeemed: string;
      liquidAmountDeducted: string;
      blockId: string;
      extrinsicId: string;
      timestamp: string;
    }[];
  };
  redeemedByUnbonds: {
    nodes: {
      id: string;
      addressId: string;
      eraIndexWhenUnbond: string;
      liquidAmount: string;
      unbondingStakingAmount: string;
      blockId: string;
      extrinsicId: string;
      timestamp: string;
    }[];
  };
  redeemedByFastMatches: {
    nodes: {
      id: string;
      addressId: string;
      matchedLiquidAmount: string;
      feeInLiquid: string;
      redeemedStakingAmount: string;
      blockId: string;
      extrinsicId: string;
      timestamp: string;
    }[];
  };
}

export class Homas extends BaseHistoryFetcher<HomaFetchParams> {
  constructor(configs: HistoryFetcherConfig) {
    super(configs);
  }

  async fetch(params: HomaFetchParams): Promise<HistoryRecord[]> {
    const variables: Record<string, string> = {
      account: params.address
    };

    const paramsSchema = `$account: String`;
    const filterSchema = `filter: { addressId: { equalTo: $account } }`;
    const requestedRedeemsResultShema = `
      nodes {
        id
        addressId
        amount
        allowFastMatch
        blockId
        extrinsicId
        timestamp
      }
    `;
    const redeemRequestedsResultShema = `
      nodes {
        id
        addressId
        amount
        extraFee
        blockId
        extrinsicId
        timestamp
      }
    `;
    const mintsResultShema = `
      nodes {
        id
        addressId
        amountStaked
        amountMinted
        stakingCurrencyAmount
        liquidAmountReceived
        liquidAmountAddedToVoid
        blockId
        extrinsicId
        timestamp
      }
    `;
    const redeemRequestCancelledsResultShema = `
      nodes {
        id
        addressId
        amount
        blockId
        extrinsicId
        timestamp
      }
    `;
    const redeemedsResultShema = `
      nodes {
        id
        addressId
        stakingAmountRedeemed
        liquidAmountDeducted
        blockId
        extrinsicId
        timestamp
      }
    `;
    const redeemedByUnbondsResultShema = `
      nodes {
        id
        addressId
        eraIndexWhenUnbond
        liquidAmount
        unbondingStakingAmount
        blockId
        extrinsicId
        timestamp
      }
    `;
    const redeemedByFastMatchesResultShema = `
      nodes {
        id
        addressId
        matchedLiquidAmount
        feeInLiquid
        redeemedStakingAmount
        blockId
        extrinsicId
        timestamp
      }
    `;

    const result = await request<FetchResult>(
      this.configs.endpoint,
      gql`
        query(${paramsSchema}){
          requestedRedeems(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${requestedRedeemsResultShema}
          }
          redeemRequesteds(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${redeemRequestedsResultShema}
          }
          mints(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${mintsResultShema}
          }
          redeemRequestCancelleds(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${redeemRequestCancelledsResultShema}
          }
          redeemeds(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${redeemedsResultShema}
          }
          redeemedByUnbonds(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${redeemedByUnbondsResultShema}
          }
          redeemedByFastMatches(
            ${filterSchema}
            first: 20
            orderBy: TIMESTAMP_DESC
          ) {
            ${redeemedByFastMatchesResultShema}
          }
        }
      `,
      variables
    );

    return this.transform(result);
  }

  private transform(data: FetchResult): HistoryRecord[] {
    const { liquidToken, stakingToken } = this.configs.wallet.getPresetTokens();
    const requestedRedeems = data.requestedRedeems.nodes.map((item) => {
      return {
        data: item,
        message: this.createRequestedRedeemsMessage(item.amount, liquidToken),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsicId,
          item.blockId
        ),
        extrinsicHash: item.extrinsicId,
        blockNumber: item.blockId
      };
    });
    const redeemRequesteds = data.redeemRequesteds.nodes.map((item) => {
      return {
        data: item,
        message: this.createRequestedRedeemsMessage(item.amount, liquidToken),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsicId,
          item.blockId
        ),
        extrinsicHash: item.extrinsicId,
        blockNumber: item.blockId
      };
    });
    const mints = data.mints.nodes.map((item) => {
      return {
        data: item,
        message: this.createMintsMessage(item.amountStaked, item.amountMinted, liquidToken, stakingToken),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsicId,
          item.blockId
        ),
        extrinsicHash: item.extrinsicId,
        blockNumber: item.blockId
      };
    });
    const redeemRequestCancelleds = data.redeemRequestCancelleds.nodes.map((item) => {
      return {
        data: item,
        message: this.createCamcelledsMessage(item.amount, liquidToken),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsicId,
          item.blockId
        ),
        extrinsicHash: item.extrinsicId,
        blockNumber: item.blockId
      };
    });
    const redeemeds = data.redeemeds.nodes.map((item) => {
      return {
        data: item,
        message: this.createredeemedsMessage(
          item.stakingAmountRedeemed,
          item.liquidAmountDeducted,
          liquidToken,
          stakingToken
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
    const redeemedByUnbonds = data.redeemedByUnbonds.nodes.map((item) => {
      return {
        data: item,
        message: this.createRedeemedByUnbondsMessage(
          item.eraIndexWhenUnbond,
          item.liquidAmount,
          liquidToken,
          stakingToken
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
    const redeemedByFastMatches = data.redeemedByFastMatches.nodes.map((item) => {
      return {
        data: item,
        message: this.createFastMatchesMessage(
          item.matchedLiquidAmount,
          item.redeemedStakingAmount,
          liquidToken,
          stakingToken
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

    return requestedRedeems
      .concat(redeemRequesteds as any)
      .concat(mints as any)
      .concat(redeemRequestCancelleds as any)
      .concat(redeemeds as any)
      .concat(redeemedByUnbonds as any)
      .concat(redeemedByFastMatches as any)
      .sort((a, b) => (new Date(b.data.timestamp) < new Date(a.data.timestamp) ? -1 : 1))
      .slice(0, 20);
  }

  private createRequestedRedeemsMessage(amount: string, liquidToken?: Token) {
    return `Request redeem ${FixedPointNumber.fromInner(amount, liquidToken?.decimals).toString(6)} ${
      liquidToken?.name
    }`;
  }

  private createMintsMessage(deposit: string, receive: string, liquidToken?: Token, stakingToken?: Token) {
    return `Stake ${FixedPointNumber.fromInner(deposit, stakingToken?.decimals)} ${
      stakingToken?.name
    } for ${FixedPointNumber.fromInner(receive, liquidToken?.decimals)} ${liquidToken?.name}`;
  }

  private createCamcelledsMessage(amount: string, liquidToken?: Token) {
    return `Cancel redeem with ${FixedPointNumber.fromInner(amount, liquidToken?.decimals)} ${liquidToken?.name}`;
  }

  private createredeemedsMessage(receive: string, deducted: string, liquidToken?: Token, stakingToken?: Token) {
    return `Redeem ${FixedPointNumber.fromInner(receive, stakingToken?.decimals)} ${
      stakingToken?.name
    } from ${FixedPointNumber.fromInner(deducted, liquidToken?.decimals)} ${liquidToken?.name}`;
  }

  private createRedeemedByUnbondsMessage(burned: string, receive: string, liquidToken?: Token, stakingToken?: Token) {
    return `UnStake ${FixedPointNumber.fromInner(burned, stakingToken?.decimals)} ${
      liquidToken?.name
    } for ${FixedPointNumber.fromInner(receive, liquidToken?.decimals)} ${stakingToken?.name}`;
  }

  private createFastMatchesMessage(burned: string, receive: string, liquidToken?: Token, stakingToken?: Token) {
    return `UnStake ${FixedPointNumber.fromInner(burned, liquidToken?.decimals)} ${
      liquidToken?.name
    } for ${FixedPointNumber.fromInner(receive, stakingToken?.decimals)} ${stakingToken?.name} By Fastmatch`;
  }
}

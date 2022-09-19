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
      blockNumber: string;
      extrinsic: string;
      timestamp: string;
    }[];
  };
  redeemRequesteds: {
    nodes: {
      id: string;
      addressId: string;
      amount: string;
      extraFee: string;
      blockNumber: string;
      extrinsic: string;
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
      blockNumber: string;
      extrinsic: string;
      timestamp: string;
    }[];
  };
  redeemRequestCancelleds: {
    nodes: {
      id: string;
      addressId: string;
      amount: string;
      blockNumber: string;
      extrinsic: string;
      timestamp: string;
    }[];
  };
  redeemeds: {
    nodes: {
      id: string;
      addressId: string;
      stakingAmountRedeemed: string;
      liquidAmountDeducted: string;
      blockNumber: string;
      extrinsic: string;
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
      blockNumber: string;
      extrinsic: string;
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
      blockNumber: string;
      extrinsic: string;
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
        blockNumber
        extrinsic 
        timestamp
      }
    `;
    const redeemRequestedsResultShema = `
      nodes {
        id
        addressId
        amount
        extraFee
        blockNumber
        extrinsic 
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
        blockNumber
        extrinsic 
        timestamp
      }
    `;
    const redeemRequestCancelledsResultShema = `
      nodes {
        id
        addressId
        amount
        blockNumber
        extrinsic 
        timestamp
      }
    `;
    const redeemedsResultShema = `
      nodes {
        id
        addressId
        stakingAmountRedeemed
        liquidAmountDeducted
        blockNumber
        extrinsic 
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
        blockNumber
        extrinsic 
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
        blockNumber
        extrinsic 
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
          item.extrinsic,
          item.blockNumber
        ),
        method: 'homa.RequestedRedeem',
        extrinsicHash: item.extrinsic,
        blockNumber: item.blockNumber
      };
    });
    const redeemRequesteds = data.redeemRequesteds.nodes.map((item) => {
      return {
        data: item,
        message: this.createRequestedRedeemsMessage(item.amount, liquidToken),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsic,
          item.blockNumber
        ),
        method: 'homaLite.RedeemRequested',
        extrinsicHash: item.extrinsic,
        blockNumber: item.blockNumber
      };
    });
    const mints = data.mints.nodes.map((item) => {
      const staked = item.amountStaked === '0' ? item.stakingCurrencyAmount : item.amountStaked;
      const minted = item.amountMinted === '0' ? item.liquidAmountReceived : item.amountMinted;
      return {
        data: item,
        message: this.createMintsMessage(staked, minted, liquidToken, stakingToken),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsic,
          item.blockNumber
        ),
        method: 'homa.Minted',
        extrinsicHash: item.extrinsic,
        blockNumber: item.blockNumber
      };
    });
    const redeemRequestCancelleds = data.redeemRequestCancelleds.nodes.map((item) => {
      return {
        data: item,
        message: this.createCamcelledsMessage(item.amount, liquidToken),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsic,
          item.blockNumber
        ),
        method: 'homa.RedeemRequestCancelled',
        extrinsicHash: item.extrinsic,
        blockNumber: item.blockNumber
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
          item.extrinsic,
          item.blockNumber
        ),
        method: 'homaLite.Redeemed',
        extrinsicHash: item.extrinsic,
        blockNumber: item.blockNumber
      };
    });
    const redeemedByUnbonds = data.redeemedByUnbonds.nodes.map((item) => {
      return {
        data: item,
        message: this.createRedeemedByUnbondsMessage(
          item.liquidAmount,
          item.unbondingStakingAmount,
          liquidToken,
          stakingToken
        ),
        resolveLinks: resolveLinks(
          getChainType(this.configs.wallet.consts.runtimeChain),
          item.extrinsic,
          item.blockNumber
        ),
        method: 'homa.RedeemedByUnbond',
        extrinsicHash: item.extrinsic,
        blockNumber: item.blockNumber
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
          item.extrinsic,
          item.blockNumber
        ),
        method: 'homa.RedeemedByFastMatch',
        extrinsicHash: item.extrinsic,
        blockNumber: item.blockNumber
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
    return `Request redeem ${FixedPointNumber.fromInner(amount, liquidToken?.decimals).toNumber(6)} ${
      liquidToken?.display
    }`;
  }

  private createMintsMessage(deposit: string, receive: string, liquidToken?: Token, stakingToken?: Token) {
    return `Stake ${FixedPointNumber.fromInner(deposit, stakingToken?.decimals).toNumber(6)} ${
      stakingToken?.display
    } for ${FixedPointNumber.fromInner(receive, liquidToken?.decimals).toNumber(6)} ${liquidToken?.display}`;
  }

  private createCamcelledsMessage(amount: string, liquidToken?: Token) {
    return `Cancel redeem with ${FixedPointNumber.fromInner(amount, liquidToken?.decimals).toNumber(6)} ${
      liquidToken?.display
    }`;
  }

  private createredeemedsMessage(receive: string, deducted: string, liquidToken?: Token, stakingToken?: Token) {
    return `Redeem ${FixedPointNumber.fromInner(receive, stakingToken?.decimals).toNumber(6)} ${
      stakingToken?.display
    } from ${FixedPointNumber.fromInner(deducted, liquidToken?.decimals).toNumber(6)} ${liquidToken?.display}`;
  }

  private createRedeemedByUnbondsMessage(burned: string, receive: string, liquidToken?: Token, stakingToken?: Token) {
    return `UnStake ${FixedPointNumber.fromInner(burned, liquidToken?.decimals).toNumber(6)} ${
      liquidToken?.display
    } for ${FixedPointNumber.fromInner(receive, stakingToken?.decimals).toNumber(6)} ${stakingToken?.display}`;
  }

  private createFastMatchesMessage(burned: string, receive: string, liquidToken?: Token, stakingToken?: Token) {
    return `UnStake ${FixedPointNumber.fromInner(burned, liquidToken?.decimals).toNumber(6)} ${
      liquidToken?.display
    } for ${FixedPointNumber.fromInner(receive, stakingToken?.decimals).toNumber(6)} ${
      stakingToken?.display
    } By Fastmatch`;
  }
}

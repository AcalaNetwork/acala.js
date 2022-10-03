import { FixedPointNumber } from '@acala-network/sdk-core';
import request, { gql } from 'graphql-request';
import { Wallet } from '../wallet';
import { AuctionBid, AuctionListQueryParams, CollateralAuction } from './types';

const DEFAULT_PAGE_SIZE = 20;

/* eslint-disable */
export const convertApiResult = (data: any, wallet: Wallet, configs: AuctionListQueryParams) => {
  const { stableToken } = wallet.getPresetTokens();

  const list: CollateralAuction[] =
    data?.collateralAuctions?.nodes?.map((item: any) => {
      const collateral = wallet.__getToken(item.collateral);
      const initAmount = FixedPointNumber.fromInner(item.initAmount, collateral.decimals);
      const amount = FixedPointNumber.fromInner(item.amount, collateral.decimals);
      const targetAmount = FixedPointNumber.fromInner(item.target || '0', stableToken.decimals);

      return {
        id: item.id,
        status: item.status,
        collateral,
        initialAmount: initAmount,
        amount,
        target: {
          amount: targetAmount,
          token: stableToken,
        },
        stage: targetAmount.isZero() ? 'NORMAL' : 'REVERSE',
        refundRecipient: item.refundRecipient,
        winner: item.winner,
        // set zero as default
        minimumBidAmount: targetAmount,
        bids: item.bids.nodes.map((item: any) => {
          const amount = FixedPointNumber.fromInner(item.amount, stableToken.decimals);
          const collateralAmount = FixedPointNumber.fromInner(item.collateralAmount, collateral.decimals);

          return {
            type: item.type as unknown as AuctionBid['type'],
            bid: {
              token: stableToken,
              amount: amount
            },
            lotSize: {
              token: collateral,
              amount: collateralAmount
            },
            bidPrice: collateralAmount.div(amount),
            timestap: new Date(item.timestamp),
            bidder: item.bidder,
            tx: item.extrinsic,
            timestamp: item.timestamp
          };
        }),
        startBlock: item.startBlockAt,
        endBlock: item?.endBlockAt,
      } as CollateralAuction;
    }) || [];

  const totalPage = Math.ceil(Number(data?.collateralAuctions?.totalCount) / (configs.pageSize || DEFAULT_PAGE_SIZE));

  return {
    current: configs.page,
    totalPage,
    list
  };
};
/* eslint-enable */

export const fetchAuctionList = (endpoint: string, params?: AuctionListQueryParams) => {
  const page = params?.page || 1;
  const pageSize = params?.pageSize || DEFAULT_PAGE_SIZE;
  const offset = (page - 1) * pageSize;
  let filter = '';

  if (params?.filter) {
    const temp: { and: any[] } = { and: [] };

    if (params.filter.account) {
      temp.and.push({
        bidder: { contains: [`'${params.filter.account}'`] }
      });
    }

    if (params.filter.status) {
      temp.and.push({
        status: { equalTo: params.filter.status }
      });
    }

    if (temp.and.length !== 0) {
      filter = 'filter:' + JSON.stringify(temp).replace(/"/g, '').replace(/'/g, '"');
    }
  }

  return request(
    endpoint,
    gql`
    query {
      collateralAuctions (offset: ${offset}, first:${pageSize}, ${filter}, orderBy: [CREATE_AT_DESC, ID_DESC]) {
        totalCount
        nodes {
          id
          collateral
          initAmount
          amount
          target
          status
          winner
          bids(orderBy:[TIMESTAMP_DESC, EVENT_INDEX_DESC]){
            nodes{
              amount
              bidder
              type
              timestamp
              collateralAmount
              extrinsic
            }
          }
          dexTake(orderBy:TIMESTAMP_DESC){
            nodes {
              amount
            }
          }
          dealt(orderBy:TIMESTAMP_DESC){
            nodes {
              winner
              paymentAmount
            }
          }
        }
      }
    }
  `
  );
};

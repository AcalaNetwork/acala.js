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

      return {
        id: item.id,
        status: item.status,
        collateral,
        initialAmount: initAmount,
        amount,
        target: {
          amount: FixedPointNumber.fromInner(item.target, stableToken.decimals),
          token: stableToken,
        },
        refundRecipient: item.refundRecipient,
        winner: item.winner,
        // set zero as default
        minimumBidAmount: FixedPointNumber.ZERO,
        bids: item.bids.nodes.map((item: any) => {
          const bidAmount = FixedPointNumber.fromInner(item.amount, stableToken.decimals);

          return {
            type: item.type as unknown as AuctionBid['type'],
            bid: {
              token: stableToken,
              amount: bidAmount
            },
            lotSize: {
              token: collateral,
              amount: amount
            },
            bidPrice: amount.div(bidAmount),
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

  return request(
    endpoint,
    gql`
    query {
      collateralAuctions (offset: ${offset}, first:${pageSize}, orderBy: [CREATE_AT_DESC, ID_DESC]) {
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

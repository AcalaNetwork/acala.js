import { Wallet } from '@acala-network/sdk/wallet';
import { request, gql } from 'graphql-request';
import { HistoryFetcher } from '../types';

class Transfers implements HistoryFetcher {
  private endpoint: string;
  private wallet: Wallet;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public fetch = (address: string) => request(this.endpoint, gql`
  `);
}

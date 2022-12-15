import { ApiOptions } from '@polkadot/api/types';

export const runtime: ApiOptions['runtime'] = {
  EVMRuntimeRPCApi: [
    {
      version: 2,
      methods: {
        call: {
          description: 'call evm contract',
          params: [
            {
              name: 'from',
              type: 'H160'
            },
            {
              name: 'to',
              type: 'H160'
            },
            {
              name: 'data',
              type: 'Vec<u8>'
            },
            {
              name: 'value',
              type: 'Balance'
            },
            {
              name: 'gas_limit',
              type: 'u64'
            },
            {
              name: 'storage_limit',
              type: 'u32'
            },
            {
              name: 'access_list',
              type: 'Option<Vec<EthereumTransactionAccessListItem>>'
            },
            {
              name: 'estimate',
              type: 'bool'
            }
          ],
          type: 'Result<CallInfo, sp_runtime::DispatchError>'
        },
        create: {
          description: 'create evm contract',
          params: [
            {
              name: 'from',
              type: 'H160'
            },
            {
              name: 'data',
              type: 'Vec<u8>'
            },
            {
              name: 'value',
              type: 'Balance'
            },
            {
              name: 'gas_limit',
              type: 'u64'
            },
            {
              name: 'storage_limit',
              type: 'u32'
            },
            {
              name: 'access_list',
              type: 'Option<Vec<EthereumTransactionAccessListItem>>'
            },
            {
              name: 'estimate',
              type: 'bool'
            }
          ],
          type: 'Result<CreateInfo, sp_runtime::DispatchError>'
        }
      }
    }
  ]
};

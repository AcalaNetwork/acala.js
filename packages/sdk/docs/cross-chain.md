## How To Use

### 1. Init SDK
```javascript
// for karura-kusama cross-chains,
 const sdk = new CrossChain({
  adapters: [
    new AcalaAdaptor({ wallet: acalaWallet, api: acalaApi }),
    new KaruraAdaptor({ wallet: karuraWallet, api: karuraApi }),
    new PolkadotAdapter({ api: polkadotApi }),
    new KusamaAdapter({ api: kusamaApi }),
  ],
});
```

### 2. Query Avaialable Routers
```javascript
...init cross-chain SDK

const routers = crossChain.getRoutes({ from: 'karura' });

console.log(routers);
```

output:
```javascript
[
  {
    from: { name: 'Karura' },
    destiantionsOptions: [
      { name: 'Kusama' }
    ],
    tokensOptions: [
      { name: 'KSM' }
    ],
    routers: [
      {
        form: { name: 'Karura' },
        to: { name: 'Kusama' },
        token: { name: 'KSM' }
      }
    ]
  }
]
```

### 2. Query Available Destination Chains
```javascript
...init cross-chain SDK

const dests = crossChain..router.getDestiantionChains({ from: 'karura' });
```

### 3. Query Available From Chains
```javascript
...init cross-chain SDK

const froms = crossChain.router.getFromChains({ to: 'karura' });
```

### 4. Query Available Tokens
```javascript
...init cross-chain SDK

const tokens = crossChain.router.getAvailableTokens({ from: 'karura', to: 'kusama' });
```

### 5. Query Transfer Input Configs
transfer input configs is complex in normal way
1. the maximum amount is defined at the **from** chain
2. the minimum amount is defined at the **to** chain for **to** chain will have existential deposit

the configs also contains some informations abount **destCrossChainFee**, **tokenDecimals**. 

| name | desc |  
| -- | -- |  
| minInput | the minimum amount used for user input |  
| maxInput | the maximum amount used for user input |  
| ss58Prefix | the ss58 prefix of to chain |  
| destinationFee.fee | the fee amount charged on the destination chain |  
| destinationFee.token | the fee token charged on the destination chain |  
| tokenDecimals | the token's decimals |

```javascript
...init cross-chain SDK

sdk.subscribeInputConfigs({
  from: 'karura',
  to: 'kusama',
  account: ACCOUNT,
  token: ksm
}).subscribe({
  next: ...do somethings.
});
```

### 6. Create Cross Chain Transfer
```javascript
const transfer = crossChain.createTx({
  from: 'karura',
  to: 'kusama',
  account: string,
  amount: new FixedpointNumber(1, 12)
});

await transfer.tx.signAndSend(ACCOUNT)
```

### 7. Subscribe Cross Chain Transfer Success Or Not  
NOTICES:
1. **subscribe cross-chain transfer status need setup destination chain adapter**
2. **judged based on the balance change, not very accurate**

```javascript
const transfer = crossChain.createTransfer({
  from: 'karura',
  to: 'kusama',
  account: string,
  amount: new FixedpointNumber(1, 12),
});

await transfer.tx.signAndSend(ACCOUNT)

sdk.subscribeBalanceChanged({
  token: 'ksm',
  address: ADDRESS,
  amount: new FixedPointNumber(1, 12),
  timeout: 3 * 60 * 1000 // will wait 3 mins for checking destiantion balance change
}).subscribe({
  next: (STATUS) => {
    if (STATUS === BalanceChangedStatus.SUCCESS) {
      console.log('transfer success');
    }
  }
})
```

## How To Support A New Chain
1. add chain data at **configschains.tx**
2. add **CrossChainAdapter** by creating a new **adapters/[CHIAN_NAME]Adapter.ts** file 
3. implement the adapter
  - propertes:
    1. chain
    2. routers
  - methods:
    1. subscribeAvailableBalance
    subscribe the available balance information
    2. subscribeMinInput
    subscribe the minimun input balnace
    3. subscribeMmaxInput
    subscribe the maximum input balnace
    4. getCrossChainFee
    return the cross chain fee configs
    5. getCrossChainTokenDecimals
    return the token decimals
    6. createTx
    return the submitable extrinsic object


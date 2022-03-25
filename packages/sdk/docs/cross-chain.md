## How To Use

### 1. Init SDK
```javascript
// for karura-kusama cross-chains,
const karuraAdapter = new KaruraAdapter(karuraWalletSDK);
const kusamaAdapter = new KusmaAdapter(kusamaApi);

const crossChain = new CrossChain({
  adapters: [
    acalaAdapter,
    kusamaAdapter
  ]
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

const dests = crossChain.getDestiantionChains({ from: 'karura' });
```

### 3. Query Available From Chains
```javascript
...init cross-chain SDK

const froms = crossChain.getFromChains({ to: 'karura' });
```

### 4. Query Available Tokens
```javascript
...init cross-chain SDK

const tokens = crossChain.getAvailableTokens({ from: 'karura', to: 'kusama' });
```

### 5. Query Transfer Configs   
transfer configs contain the important information for the cross-chain transfer

| name | desc |  
| -- | -- |  
| token | the token on origin chain |
| balance | the token balances on origin chain |
| warnings | some warning messages for the transfer | 
| errors | some errors for the transfer if have |  
| available | will be true when no errors |
| minInput | the minimum amount used for user input |  
| maxInput | the maximum amount used for user input |  
| showKeepAlive | a switch to control whether display keepalive toggle |  
| destinationED | the existential deposits config on destination chain |  
| destinationFee.fee | the fee amount charged on the destination chain |  
| destinationFee.token | the fee token charged on the destination chain |  

```javascript
...init cross-chain SDK

const ksm = await wallet.getToken('KSM');
const transferConfigs = await crossChain.getTransferConfigs({
  from: 'karura',
  to: 'kusama',
  account: ACCOUNT,
  token: ksm
});

crossChain.subscribeTransferConfigs({
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
const transfer = crossChain.createTransfer({
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

transfer.watch({
  timeout: 3 * 60 * 1000 // will wait 3 mins for checking destiantion balance change
}).subscribe({
  next: () => {
    // do something
  }
})
```

## How To Support A New Chain
1. add chain data at **configschains.tx**
2. add **CrossChainAdapter** by creating a new **adapters/[CHIAN_NAME]Dapter.ts** file 
3. implement the adapter
  - propertes:
    1. chain
    2. routers
  - methods:
    1. subscrineEnv
    subscribe the transfer environments include min/max input amount, token ED.etc.
    2. getCrossChainFeeConfigs
    get the cross-chain fee configs
    3. subscribeBalance
    subscribe the balance informations for token
    4. createTx
    used for create cross-chain transfer

# Acala Liquid Staking

Acala Liquid Staking allow user staking their DOT/KSM on Acala/Karura Chain

## **Homa** SDK

Homa SDK provide 

## Install **Homa** SDK

```bash
yarn add @polkadot/api @acala-network/api@^4.0.2-17 @acala-network/sdk@^4.0.2-17
```

## Usage

1. How to initialize the **Homa** SDK
```javascript
const { ApiPromise, WsProvider } = require('@polkadot/api')
const { options } = require('@acala-network/api')
const { Wallet, Homa } = require('@acala-network/sdk')

async function main () {
        const ENDPOINT = 'wss://karura.api.onfinality.io/public-ws'

        const api = await ApiPromise.create(options({ provider: new WsProvider(ENDPOINT) }))
        const wallet = new Wallet(api)
        const homa = new Homa(api, wallet)

        // should wait homa sdk ready
        await homa.isReady

        const env = await homa.getEnv();

        // total staking token in homa
        console.log(env.totalStaking.toString())
        // total liquid token in homa
        console.log(env.totalLiquidity.toString())
        // homa apy
        console.log(env.apy.toString())
        // homa exchange apy
        console.log(env.exchangeRate.toString())
        // min mint threshold
        console.log(env.mintThreshold.toString())
        // min redeem threshold
        console.log(env.redeemThreshold.toString())
        // staking soft cap
        console.log(env.stakingSoftCap.toString())
}

;main()

```

2. How to stake DOT/KSM
```javascript
...init homa sdk

const keyring = new Keyring({ type: 'sr25519' })
const account = keyring.addFromMnemonic('XXX') // your account mnemonic
const stakingToken = await wallet.getToken('KSM')
const amount = new FixedPointNumber(10, stakingToken.decimals);

const mint = await homa.getEstimateMintResult(amount)

// check pay amount
console.log(mint.pay.toString())
// check receive amount
console.log(mint.receive.toString())

const call = homa.createMintCall(mint.pay)

// send call to mint LDOT/LKSM
await call.signAndSend(account)
```

2. How to redeem LDOT/LKSM normally, need wait 1 ERA ()
```javascript
...init homa sdk

const keyring = new Keyring({ type: 'sr25519' })
const account = keyring.addFromMnemonic('XXX') // your account mnemonic
const liquidToken = await wallet.getToken('LKSM')
const amount = new FixedPointNumber(10, liquidToken.decimals);

const redeem = await homa.getEstimateRedeemResult(amount, false)

// check request amount to redeem
console.log(redeem.request.toString())
// check receive amount
console.log(redeem.receive.toString())

const call = homa.createRedeemCall(redeem.request, false)

// send call to mint LDOT/LKSM
await call.signAndSend(account)
```

3. How to fast redeem LDOT/LKSM, if the system has enough staking token in pending staking pool
```javascript
...init homa sdk

const keyring = new Keyring({ type: 'sr25519' })
const account = keyring.addFromMnemonic('XXX') // your account mnemonic
const liquidToken = await wallet.getToken('LKSM')
const amount = new FixedPointNumber(10, liquidToken.decimals);

const redeem = await homa.getEstimateRedeemResult(amount, true)

// check request amount to redeem
console.log(redeem.request.toString())
// check receive amount
console.log(redeem.receive.toString())

if (mint.canTryFastReddem) {
  const call = homa.createRedeemCall(redeem.request, true, keyring.address)

  // send call to mint LDOT/LKSM
  await call.signAndSend(account)
}

```

4. How to convert DOT/KSM amount to LDOT/KSM amount
```javascript
...init homa sdk

const {
  convertLiquidToStaking,
  convertStakingToLiquid
} = await homa.getConvertor()

const liquidToken = await wallet.getToken('LKSM')
const stakingToken = await wallet.getToken('KSM')

const liquidAmount = new FixedPointNumber(10, liquidToken.decimals)
const stakingAmount = new FixedPointNumber(10, stakingToken.decimals)

console.log(convertLiquidToStaking(liquidAmount).toString())
console.log(convertStakingToLiquid(stakingAmount).toString())
```
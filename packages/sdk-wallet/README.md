# @acala-network/sdk-swap

### Install
```bash
npm install @acala-network/sdk-wallet
```

### Initialize

```js
const wallet = new Wallet({ api });

await wallet.init();
```

### Usage

1. query the balance of address.
  + the free balance the all balance in the account.
  + the available balance the transferable in the account.
  + the locked balance
  + the reserved balance

```js
  const alice = 'alice';
  const token = wallet.getToken('DOT');
  const balance = await wallet.queryBalance(alice, 'DOT');

  console.log(`
    freeBalance: ${balance.freeBalance.toString()}
    availableBalance: ${balance.availableBalance.toString()}
    lockedBalance: ${balance.lockedBalance.toString()}
  `);
```

2. query all avialable tokens

beacuse of the acala and the karura support multiply tokens, the user can use `getAllTokens` to query all usable tokens.

```js
  const currencies = await wallet.getAllTokens();
```

3. get the currencie of chain

```js
  const token = wallet.getToken('DOT');

  console.log(`
    name: ${token.name}
    decimal: ${token.decimal}
  `)
```

3. query token price

we can use `queryPrice` to query the tokens price

```js
  const token = wallet.getToken('DOT');
  const price = await wallet.queryPrice(token);

  console.log(`
    name: ${token.name}
    decimal: ${token.decimal}
    price: ${price.toString()}
  `)
```

4. query oacle price
we can use `queryOraclePrice` to query the price from the oracle.

```js
  const token = wallet.getToken('DOT');
  const price = await wallet.queryOraclePrice(token);

  console.log(`
    name: ${token.name}
    decimal: ${token.decimal}
    price: ${price.toString()}
  `)
```

5. query dex share price
we can use `queryDexSharePriceFromDex` to query the price from the oracle.

```js
  const token = wallet.getToken('lp://DOT/AUSD');
  const price = await wallet.queryDexSharePriceFromDex(token);

  console.log(`
    name: ${token.name}
    decimal: ${token.decimal}
    price: ${price.toString()}
  `)
```

6. query price from dex
we can use `queryPriceFromDex` to query the price from the oracle.

```js
  const token = wallet.getToken('DOT');
  const price = await wallet.queryPriceFromDex(token);

  console.log(`
    name: ${token.name}
    decimal: ${token.decimal}
    price: ${price.toString()}
  `)
```
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

1. get the balance of address

```js
  const alice = 'alice';
  const balance = await wallet.getBalance(alice, 'DOT');

  console.log(`
    amount: ${balance.amount}
    decimal: ${balance.decimal}
    currency: ${balance.currency.name}
  `);
```

2. get all usable currencies in the network

beacuse of the acala and the karura have different currencies, so we can use `getAllCurrencies` to query all usable currencies information in target chain.

```js
  const currencies = await wallet.getAllCurrencies();
```

3. get the currencie of chain

```js
  const currency = wallet.getCurrency('DOT');

  console.log(`
    name: ${currency.name}
    decimal: ${currency.decimal}
  `)
```

4. send transfer transactionn

```js
  const alice = 'Alice';

  /* send 10 DOT by amount or the user can send 10 DOT by rawAmount

    const sendable = await wallet.createSend(alice, {
      rawAmount: 10 * 10 ** 10,
      currency: 'DOT'
     });
  */
  const sendable = await wallet.createSend(alice, {
    amount: 10,
    currency: 'DOT'
  });


  console.log(`
    amount: ${sendable.amount.toNumber()}
    currency: ${sendable.currency.toNumber()}
  `);

  // check if the transition success
  try {
    await sendable.check();
  } catch (e) {
    console.error(e);
  }

  /*
    the user can also merge check and send actions by checkAndSend

    await sendable.checkAndSend();
  */
  await sendable.send();
```
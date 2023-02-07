## 1. Prepare NFT Data
The Acala NFT is defined via *metadata.json* file which saved on ipfs.

The file contains three properties:
+ name: the name
+ image: the image's ipfs link
+ description: some description

e.g., acala Crowdloan Contributor 2021 NFT
```json
{
  name : "Acala Crowdloan Contributor 2021",
  image: "ipfs://bafybeiayt2c2qvs5lbxuvyieovpxwdwk2rh7h7qr45dpobfuq3slaynp5y/acala-crowdloan-contributor.gif",
  description: "Reward for contributing to Acala's crowdloan, winning slot #1 on Polkadot in 2021. NFT designed by Reva."
}
```

## 2. Create NFT Class
we should create an class at first after all data is ready.

using api `tx.nft.createClass` to create an class for NFT.

the parameters is:
+ CID of metadata.json
+ the properties of the nft
  - Transferable: the nft token can transfer to someone
  - Burnable: the nft token can be burned
  - Mintable: the nft token can be minted
  - ClassPropertiesMutable: can modify the class properties
+ some attributes of the nft, the field can keep empty

create NFT class will lock **50** ACA (query from *api.conts.nft.createClassDeposit*), so the signed account balance should bigger than 50 ACA

```typescript
const api = await init('acala');

const tx = api.tx.nft.createClass(
  'bafybeidwelvgywzwmnvv46xdzldl2pw6gaprq7aalelu2pp372x3abth74',
  api.createType('Properties', ['Transferable', 'Burnable', 'Mintable', 'ClassPropertiesMutable']).toHex(),
  ''
);

const keyring = new Keyring({ type: 'sr25519' });
const alice = keyring.addFromUri('//Alice');

await tx.signAndSend(alice);
```

## 3. Mint NFT
before mint NFT, we should get the class id first, which can be found in the create NFT class success event.

there are 3 steps to mint NFT
1. get the owner address because NFT class is belong to a virtual address.
2. transfer to owner address some ACA/KAR for that creating NFT will lock some ACA (query from *api.consts.nft.createTokenDeposit*).
3. call **api.tx.nft.mint** via **api.proxy.proxy** tools to mint the NFT.

the parameters of **api.tx.nft.mint**
 + to address
 + nft class id
 + metadata
 + attributes
 + quantity

e.g.
```typescript
const nftClassId = '5'
const nftClass = await api.query.ormlNFT.classes(nftClassId);
const owner = nftClass.value.owner.toString();
const amount = 10;

await api.tx.balances.transfer(owner, 2 * 10**11 * amount).signAndSend(alice);

const tx = api.tx.proxy.proxy(
  nftClass.value.owner.toString(),
  'Any',
  api.tx.nft.mint(
    alice.address,
    nftClassId,
    '',
    '',
    amount
  )
);

await tx.signAndSend(alice);
```
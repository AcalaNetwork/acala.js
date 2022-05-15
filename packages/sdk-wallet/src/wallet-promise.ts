import { ApiPromise } from '@polkadot/api';

import { TimestampedValue, OrmlAccountData } from '@open-web3/orml-types/interfaces';
import { FixedPointNumber as FN, getPromiseOrAtQuery, isDexShareName, Token } from '@acala-network/sdk-core';
import { Balance, OracleKey, Ledger } from '@acala-network/types/interfaces';
import { forceToCurrencyId, forceToCurrencyName, unzipDexShareName } from '@acala-network/sdk-core/converter';
import { MaybeAccount, MaybeCurrency } from '@acala-network/sdk-core/types';
import { BalanceData, PriceData, PriceDataWithTimestamp } from './types';
import type { ISubmittableResult, ITuple } from '@polkadot/types/types';
import { WalletBase } from './wallet-base';
import { AccountData, BlockHash, AccountInfo } from '@polkadot/types/interfaces';
import { BelowExistentialDeposit } from './errors';
import { Option } from '@polkadot/types';
import { ORACLE_FEEDS_TOKEN } from './config';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { getMaxAvailableBalance } from './utils/get-max-available-balance';
import { AcalaPrimitivesCurrencyCurrencyId } from '@acala-network/types/interfaces/types-lookup';

const queryFN = getPromiseOrAtQuery;

export class WalletPromise extends WalletBase<ApiPromise> {
  constructor(api: ApiPromise) {
    super(api);
  }

  // query price info, support specify data source
  public queryPrice = async (currency: MaybeCurrency, at?: number): Promise<PriceData> => {
    const currencyName = forceToCurrencyName(currency);
    const liquidCurrencyId = this.api.consts?.homa?.liquidCurrencyId || this.api.consts?.homaLite?.liquidCurrencyId;

    // get liquid currency price from staking pool exchange rate
    if (liquidCurrencyId && forceToCurrencyName(currency) === forceToCurrencyName(liquidCurrencyId)) {
      return this.queryLiquidPriceFromHomaLite(at);
    }

    // get dex share price
    if (isDexShareName(currencyName)) {
      return this.queryDexSharePriceFormDex(currency, at);
    }

    // get stable coin price
    if (currencyName === 'AUSD' || currencyName === 'KUSD') {
      const usd = this.tokenMap.get('AUSD') || this.tokenMap.get('KUSD') || new Token('USD', { decimals: 12 });

      return {
        token: usd,
        price: new FN(1, usd.decimals)
      };
    }

    // get price of ORACLE_FEEDS_TOKEN
    if (ORACLE_FEEDS_TOKEN.includes(currencyName)) {
      return this.queryPriceFromOracle(currency, at);
    }

    // get price from dex default
    return this.queryPriceFromDex(currency, at);
  };

  public queryDexSharePriceFormDex = async (currency: MaybeCurrency, at?: number): Promise<PriceData> => {
    const [key1, key2] = unzipDexShareName(forceToCurrencyName(currency));
    const dexShareCurrency = forceToCurrencyId(this.api, currency);
    const currency1 = forceToCurrencyId(this.api, key1);
    const currency2 = forceToCurrencyId(this.api, key2);
    const token1 = this.getToken(key1);
    const token2 = this.getToken(key2);
    const dexShareToken = this.getToken(dexShareCurrency);

    return this.getBlockHash(at).then(async (hash) => {
      const [dex, totalIssuance, price1, price2] = await Promise.all([
        queryFN(this.queryDexPool, hash)(currency1, currency2),
        queryFN(this.queryIssuance, hash)(dexShareToken),
        this.queryPrice(token1, at),
        this.queryPrice(token2, at)
      ]);
      const currency1Amount = dex[0];
      const currency2Amount = dex[1];
      const currency1AmountOfOne = currency1Amount.div(totalIssuance);
      const currency2AmountOfOne = currency2Amount.div(totalIssuance);
      const price = currency1AmountOfOne.times(price1.price).plus(currency2AmountOfOne.times(price2.price));

      return {
        token: dexShareToken,
        price
      };
    });
  };

  public queryPriceFromOracle = (token: MaybeCurrency, at?: number): Promise<PriceData> => {
    return this.getBlockHash(at).then((hash) => {
      const currencyId = forceToCurrencyId(this.api, token);

      return (
        queryFN(this.api.query.acalaOracle.values, hash)(currencyId) as any as Promise<Option<TimestampedValue>>
      ).then((data) => {
        const token = this.getToken(currencyId);
        const price = data.unwrapOrDefault().value;

        return price.isEmpty ? { token, price: new FN(0) } : { token, price: FN.fromInner(price.toString()) };
      });
    });
  };

  public queryLiquidPriceFromHomaLite = (at?: number): Promise<PriceData> => {
    // FIXME: need remove homaLite
    const liquidCurrencyId = this.api.consts.homa?.liquidCurrencyId || this.api.consts.homaLite?.liquidCurrencyId;
    const stakingCurrencyId = this.api.consts.homa?.stakingCurrencyId || this.api.consts.homaLite?.stakingCurrencyId;

    const liquidToken = this.getToken(liquidCurrencyId);
    const stakingToken = this.getToken(stakingCurrencyId);

    return this.getBlockHash(at)
      .then((hash) => {
        return Promise.all([
          this.queryPriceFromOracle(stakingToken, at),
          queryFN<() => Promise<Balance>>(this.api.query.homaLite.totalStakingCurrency, hash)(),
          this.queryIssuance(liquidToken, at)
        ]);
      })
      .then(([stakingTokenPrice, stakingBalance, liquidIssuance]) => {
        const bonded = FN.fromInner(stakingBalance.toString(), stakingToken.decimals);

        const ratio = liquidIssuance.isZero() ? FN.ZERO : bonded.div(liquidIssuance);

        return {
          token: liquidToken,
          price: stakingTokenPrice.price.times(ratio)
        };
      });
  };

  public queryLiquidPriceFromStakingPool = (at?: number): Promise<PriceData> => {
    const liquidCurrencyId = this.api.consts.stakingPool.liquidCurrencyId;
    const stakingCurrencyId = this.api.consts.stakingPool.stakingCurrencyId;

    const liquidToken = this.getToken(liquidCurrencyId);
    const stakingToken = this.getToken(stakingCurrencyId);

    return this.getBlockHash(at)
      .then((hash) => {
        return Promise.all([
          this.queryPriceFromOracle(stakingToken, at),
          queryFN<() => Promise<Ledger>>(this.api.query.stakingPool.stakingPoolLedger, hash)(),
          this.queryIssuance(liquidToken, at)
        ]);
      })
      .then(([stakingTokenPrice, ledger, liquidIssuance]) => {
        const bonded = FN.fromInner(ledger.bonded.toString());
        const freePool = FN.fromInner(ledger.freePool.toString());
        const unbindingToFree = FN.fromInner(ledger.unbondingToFree.toString());
        const toUnbindNextEra = FN.fromInner(
          !ledger.toUnbondNextEra.isEmpty ? ledger.toUnbondNextEra[0].toString() : '0'
        );

        const totalStakingTokenBalance = bonded
          .plus(freePool)
          .plus(unbindingToFree)
          .minus(toUnbindNextEra)
          .max(FN.ZERO);

        totalStakingTokenBalance.forceSetPrecision(stakingToken.decimals);

        const ratio = liquidIssuance.isZero() ? FN.ZERO : totalStakingTokenBalance.div(liquidIssuance);

        return {
          token: liquidToken,
          price: stakingTokenPrice.price.times(ratio)
        };
      });
  };

  public queryDexPool = (token1: MaybeCurrency, token2: MaybeCurrency, at?: number): Promise<[FN, FN]> => {
    const token1CurrencyId = forceToCurrencyId(this.api, token1);
    const token2CurrencyId = forceToCurrencyId(this.api, token2);
    const _token1 = Token.fromCurrencyId(token1CurrencyId);
    const _token2 = Token.fromCurrencyId(token2CurrencyId);
    const [sorted1, sorted2] = Token.sort(_token1, _token2);

    return this.getBlockHash(at).then((hash) => {
      return (
        queryFN(this.api.query.dex.liquidityPool, hash)([sorted1.toChainData(), sorted2.toChainData()]) as Promise<
          ITuple<[Balance, Balance]>
        >
      ).then((pool: ITuple<[Balance, Balance]>) => {
        const balance1 = pool[0];
        const balance2 = pool[1];

        const fixedPoint1 = FN.fromInner(balance1.toString(), this.getToken(sorted1).decimals);
        const fixedPoint2 = FN.fromInner(balance2.toString(), this.getToken(sorted2).decimals);

        if (forceToCurrencyName(sorted1) === forceToCurrencyName(token1)) {
          return [fixedPoint1, fixedPoint2];
        } else {
          return [fixedPoint2, fixedPoint1];
        }
      });
    });
  };

  public queryPriceFromDex = (currency: MaybeCurrency, at?: number): Promise<PriceData> => {
    const target = this.tokenMap.get(forceToCurrencyName(currency));
    const usd = this.tokenMap.get('AUSD') || this.tokenMap.get('KUSD');

    if (!target || !usd)
      return Promise.resolve({
        token: new Token(forceToCurrencyName(currency)),
        price: FN.ZERO
      });

    return this.queryDexPool(target, usd, at).then((result) => {
      if (result[0].isZero() || result[1].isZero()) return { token: target, price: FN.ZERO };

      return {
        token: target,
        price: result[1].div(result[0])
      };
    });
  };

  public queryIssuance = async (currency: MaybeCurrency, at?: number): Promise<FN> => {
    let currencyId: AcalaPrimitivesCurrencyCurrencyId;
    let currencyName: string;
    let token: Token;

    try {
      currencyId = forceToCurrencyId(this.api, currency);
      currencyName = forceToCurrencyName(currency);
      token = this.getToken(currency);
    } catch (e) {
      return FN.ZERO;
    }

    return this.getBlockHash(at)
      .then((hash) => {
        if (currencyName === this.nativeToken) {
          return queryFN(this.api.query.balances.totalIssuance, hash.toString())(currencyId) as Promise<Balance>;
        }

        return queryFN(this.api.query.tokens.totalIssuance, hash.toString())(currencyId) as Promise<Balance>;
      })
      .then((data) => (!data ? new FN(0, token.decimals) : FN.fromInner(data.toString(), token.decimals)));
  };

  public queryBalance = async (account: MaybeAccount, currency: MaybeCurrency, at?: number): Promise<BalanceData> => {
    const tokenName = forceToCurrencyName(currency);
    const currencyId = forceToCurrencyId(this.api, currency);
    const isNativeToken = tokenName === this.nativeToken;

    return this.getBlockHash(at)
      .then((hash): Promise<AccountData | OrmlAccountData> => {
        if (isNativeToken) {
          return queryFN<(account: any) => Promise<AccountInfo>>(
            this.api.query.system.account,
            hash.toString()
          )(account).then((data) => data.data) as any as Promise<AccountData>;
        }

        return queryFN(this.api.query.tokens.accounts, hash.toString())(
          account,
          currencyId
        ) as any as Promise<OrmlAccountData>;
      })
      .then((data) => {
        const token = this.getToken(currencyId);
        let freeBalance = FN.ZERO;
        let lockedBalance = FN.ZERO;
        let reservedBalance = FN.ZERO;
        let availableBalance = FN.ZERO;

        if (isNativeToken) {
          data = data as AccountData;

          freeBalance = FN.fromInner(data.free.toString(), token.decimals);
          lockedBalance = FN.fromInner(data.miscFrozen.toString(), token.decimals).max(
            FN.fromInner(data.feeFrozen.toString(), token.decimals)
          );
          reservedBalance = FN.fromInner(data.reserved.toString(), token.decimals);
        } else {
          data = data as unknown as OrmlAccountData;

          freeBalance = FN.fromInner(data.free.toString(), token.decimals);
          lockedBalance = FN.fromInner(data.frozen.toString(), token.decimals);
          reservedBalance = FN.fromInner(data.reserved.toString(), token.decimals);
        }

        availableBalance = freeBalance.sub(lockedBalance).max(FN.ZERO);

        return {
          token,
          freeBalance,
          lockedBalance,
          reservedBalance,
          availableBalance
        };
      });
  };

  private async getBlockHash(at?: number | string): Promise<string | BlockHash> {
    if (!at) return '';

    return this.api.rpc.chain.getBlockHash(at);
  }

  public queryPrices(currencies: MaybeCurrency[]): Promise<PriceData[]> {
    return Promise.all(currencies.map((item) => this.queryPrice(item)));
  }

  public async queryOraclePrice(oracleProvider = 'Aggregated'): Promise<PriceDataWithTimestamp[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return (this.api.rpc as any).oracle.getAllValues(oracleProvider).then((result: [[OracleKey, TimestampedValue]]) => {
      return result.map((item) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const token = this.tokenMap.get(item[0].asToken.toString())!;
        const price = FN.fromInner(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (item[1]?.value as any)?.value.toString() || '0'
        );

        return {
          token,
          price,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          timestamp: new Date((item[1]?.value as any)?.timestamp.toNumber())
        };
      });
    });
  }

  public async checkTransfer(
    account: MaybeAccount,
    currency: MaybeCurrency,
    amount: FN,
    direction: 'from' | 'to' = 'to'
  ): Promise<boolean> {
    const transferConfig = this.getTransferConfig(currency);
    const tokenName = forceToCurrencyName(currency);
    const isNativeToken = tokenName === this.nativeToken;
    const accountInfo = (await this.api.query.system.account(account)) as unknown as AccountInfo;
    const balance = await this.queryBalance(account, currency);

    let needCheck = true;

    // always check ED if the direction is `to`
    if (direction === 'to' && balance.freeBalance.add(amount).lt(transferConfig.existentialDeposit || FN.ZERO)) {
      throw new BelowExistentialDeposit(account, currency);
    }

    if (direction === 'from') {
      if (isNativeToken) {
        needCheck = !(accountInfo.consumers.toBigInt() === BigInt(0));
      } else {
        needCheck = !(accountInfo.providers.toBigInt() > BigInt(0) || accountInfo.consumers.toBigInt() === BigInt(0));
      }

      if (needCheck && balance.freeBalance.minus(amount).lt(transferConfig.existentialDeposit || FN.ZERO)) {
        throw new BelowExistentialDeposit(account, currency);
      }
    }

    return true;
  }

  // this interface is not implemented
  public async subscribeOracleFeed(): Promise<PriceDataWithTimestamp[]> {
    return [];
  }

  public async getMaxInputBalance(
    call: SubmittableExtrinsic<'promise', ISubmittableResult>,
    currency: MaybeCurrency,
    account: MaybeAccount,
    isAllowDeath: boolean,
    fee: {
      currency: MaybeCurrency;
      amount: FN;
    }
  ): Promise<FN> {
    const accountInfo = await this.api.query.system.account<AccountInfo>(account.toString());
    const currencyInfo = await this.api.query.tokens.accounts<OrmlAccountData>(
      account.toString(),
      forceToCurrencyId(this.api, currency)
    );
    const feeCurrencyInfo = await this.api.query.tokens.accounts<OrmlAccountData>(
      account.toString(),
      forceToCurrencyId(this.api, fee.currency)
    );

    const nativeToken = this.getToken(this.nativeToken);
    const targetToken = this.getToken(currency);
    const feeToken = this.getToken(fee.currency);
    const isNativeToken = this.isNativeToken(currency);

    const providers = accountInfo.providers.toNumber();
    const consumers = accountInfo.consumers.toNumber();
    const nativeFreeBalance = FN.fromInner(accountInfo.data.free.toString(), nativeToken.decimals);
    // native locked balance = max(accountInfo.data.miscFrozen, accountInfo.data.feeFrozen)
    const nativeLockedBalance = FN.fromInner(accountInfo.data.miscFrozen.toString(), nativeToken.decimals).max(
      FN.fromInner(accountInfo.data.feeFrozen.toString(), nativeToken.decimals)
    );
    const isFeeToken = forceToCurrencyName(feeToken) === forceToCurrencyName(currency);
    const isDefaultFee = forceToCurrencyName(feeToken) === nativeToken.name;
    const feeFreeBalance = isDefaultFee
      ? nativeFreeBalance
      : FN.fromInner(feeCurrencyInfo.free.toString(), feeToken.decimals);
    // const feeLockedBalance =
    //   forceToCurrencyName(feeToken) === nativeToken.name
    //     ? nativeLockedBalance
    //     : FN.fromInner(feeCurrencyInfo.frozen.toString(), feeToken.decimals);
    const targetFreeBalance = isNativeToken
      ? nativeFreeBalance
      : FN.fromInner(currencyInfo.free.toString(), targetToken.decimals);
    const targetLockedBalance = isNativeToken
      ? nativeLockedBalance
      : FN.fromInner(currencyInfo.frozen.toString(), targetToken.decimals);
    const ed = this.getTransferConfig(currency).existentialDeposit;

    return getMaxAvailableBalance({
      isDefaultFee,
      isNativeToken,
      isFeeToken,
      isAllowDeath,
      providers,
      consumers,
      feeFreeBalance,
      targetFreeBalance,
      targetLockedBalance,
      ed,
      fee: fee.amount
    });
  }
}

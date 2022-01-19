import { createDexShareName, createStableAssetName, getCurrencyObject, unzipDexShareName } from './converter';

describe('converter', () => {
  test('dex share name should work', () => {
    const name1 = createDexShareName('KAR', 'KSM');
    const name2 = createDexShareName(name1, 'KSM');
    const name3 = createDexShareName(name1, name2);

    const _name2 = `lp://${encodeURIComponent('lp://KAR/KSM')}/KSM`;

    expect(name1).toEqual('lp://KAR/KSM');
    expect(name2).toEqual(_name2);
    expect(name3).toEqual(`lp://${encodeURIComponent('lp://KAR/KSM')}/${encodeURIComponent(_name2)}`);
  });
  test('unzip dex share name should work', () => {
    const name1 = createDexShareName('KAR', 'KSM');
    const name2 = createDexShareName(name1, 'KSM');
    const name3 = createDexShareName(name1, name2);

    expect(unzipDexShareName(name1)).toEqual(['KAR', 'KSM']);
    expect(unzipDexShareName(name2)).toEqual(['lp://KAR/KSM', 'KSM']);
    expect(unzipDexShareName(name3)).toEqual(['lp://KAR/KSM', 'lp://lp%3A%2F%2FKAR%2FKSM/KSM']);
  });
  test('get Currency Object should work', () => {
    const name1 = createDexShareName('KAR', 'KSM');
    const name2 = createDexShareName(name1, 'KSM');
    const name3 = createDexShareName(name1, name2);
    const name4 = createStableAssetName(1);
    const name5 = createDexShareName(name2, name4);

    expect(getCurrencyObject(name1)).toEqual({ DexShare: [{ Token: 'KAR' }, { Token: 'KSM' }] });
    expect(getCurrencyObject(name2)).toEqual({
      DexShare: [{ DexShare: [{ Token: 'KAR' }, { Token: 'KSM' }] }, { Token: 'KSM' }]
    });
    expect(getCurrencyObject(name3)).toEqual({
      DexShare: [
        { DexShare: [{ Token: 'KAR' }, { Token: 'KSM' }] },
        { DexShare: [{ DexShare: [{ Token: 'KAR' }, { Token: 'KSM' }] }, { Token: 'KSM' }] }
      ]
    });
    expect(getCurrencyObject(name4)).toEqual({ StableAssetPoolToken: 1 });
    expect(getCurrencyObject(name5)).toEqual({
      DexShare: [
        {
          DexShare: [{ DexShare: [{ Token: 'KAR' }, { Token: 'KSM' }] }, { Token: 'KSM' }]
        },
        { StableAssetPoolToken: 1 }
      ]
    });
  });
});

"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _converter = require("./converter");
describe('converter', ()=>{
    test('dex share name should work', ()=>{
        const name1 = (0, _converter.createDexShareName)('KAR', 'KSM');
        const name2 = (0, _converter.createDexShareName)(name1, 'KSM');
        const name3 = (0, _converter.createDexShareName)(name1, name2);
        const _name2 = `lp://${encodeURIComponent('lp://KAR/KSM')}/KSM`;
        expect(name1).toEqual('lp://KAR/KSM');
        expect(name2).toEqual(_name2);
        expect(name3).toEqual(`lp://${encodeURIComponent('lp://KAR/KSM')}/${encodeURIComponent(_name2)}`);
    });
    test('unzip dex share name should work', ()=>{
        const name1 = (0, _converter.createDexShareName)('KAR', 'KSM');
        const name2 = (0, _converter.createDexShareName)(name1, 'KSM');
        const name3 = (0, _converter.createDexShareName)(name1, name2);
        expect((0, _converter.unzipDexShareName)(name1)).toEqual([
            'KAR',
            'KSM'
        ]);
        expect((0, _converter.unzipDexShareName)(name2)).toEqual([
            'lp://KAR/KSM',
            'KSM'
        ]);
        expect((0, _converter.unzipDexShareName)(name3)).toEqual([
            'lp://KAR/KSM',
            'lp://lp%3A%2F%2FKAR%2FKSM/KSM'
        ]);
    });
    test('get Currency Object should work', ()=>{
        const name1 = (0, _converter.createDexShareName)('KAR', 'KSM');
        const name2 = (0, _converter.createDexShareName)(name1, 'KSM');
        const name3 = (0, _converter.createDexShareName)(name1, name2);
        const name4 = (0, _converter.createStableAssetName)(1);
        const name5 = (0, _converter.createDexShareName)(name2, name4);
        expect((0, _converter.getCurrencyObject)(name1)).toEqual({
            DexShare: [
                {
                    Token: 'KAR'
                },
                {
                    Token: 'KSM'
                }
            ]
        });
        expect((0, _converter.getCurrencyObject)(name2)).toEqual({
            DexShare: [
                {
                    DexShare: [
                        {
                            Token: 'KAR'
                        },
                        {
                            Token: 'KSM'
                        }
                    ]
                },
                {
                    Token: 'KSM'
                }
            ]
        });
        expect((0, _converter.getCurrencyObject)(name3)).toEqual({
            DexShare: [
                {
                    DexShare: [
                        {
                            Token: 'KAR'
                        },
                        {
                            Token: 'KSM'
                        }
                    ]
                },
                {
                    DexShare: [
                        {
                            DexShare: [
                                {
                                    Token: 'KAR'
                                },
                                {
                                    Token: 'KSM'
                                }
                            ]
                        },
                        {
                            Token: 'KSM'
                        }
                    ]
                }
            ]
        });
        expect((0, _converter.getCurrencyObject)(name4)).toEqual({
            StableAssetPoolToken: 1
        });
        expect((0, _converter.getCurrencyObject)(name5)).toEqual({
            DexShare: [
                {
                    DexShare: [
                        {
                            DexShare: [
                                {
                                    Token: 'KAR'
                                },
                                {
                                    Token: 'KSM'
                                }
                            ]
                        },
                        {
                            Token: 'KSM'
                        }
                    ]
                },
                {
                    StableAssetPoolToken: 1
                }
            ]
        });
    });
});

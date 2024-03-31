"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _token = require("./token");
describe('token', ()=>{
    const t1 = new _token.Token('DOT', {
        decimals: 18
    });
    test('token constructor should work', ()=>{
        expect(t1.name).toEqual('DOT');
        expect(t1.decimals).toEqual(18);
    });
    test('clone tokens should work', ()=>{
        const t2 = t1.clone();
        expect(t2.name).toEqual('DOT');
        expect(t2.decimals).toEqual(18);
    });
    test('fromCurrencyId set default token decimal should work', ()=>{
        const mockACA = {
            asToken: {
                toString: ()=>'ACA'
            },
            isToken: true
        };
        const mockAUSD = {
            asToken: {
                toString: ()=>'AUSD'
            },
            isToken: true
        };
        const mockDOT = {
            asToken: {
                toString: ()=>'DOT'
            },
            isToken: true
        };
        expect(_token.Token.fromCurrencyId(mockACA).name).toEqual('ACA');
        expect(_token.Token.fromCurrencyId(mockAUSD).name).toEqual('AUSD');
        expect(_token.Token.fromCurrencyId(mockDOT).name).toEqual('DOT');
    });
    test('toChainData should work', ()=>{
        expect(t1.toChainData()).toEqual({
            Token: 'DOT'
        });
    });
    test('isEqual should work', ()=>{
        const t2 = t1.clone();
        const t3 = new _token.Token('DOT', {
            decimals: 17
        });
        const t4 = new _token.Token('AUSD', {
            decimals: 18
        });
        expect(t1.isEqual(t2)).toEqual(true);
        expect(t1.isEqual(t3, (i, j)=>i.name === j.name && i.decimals === j.decimals)).toEqual(false);
        expect(t1.isEqual(t4)).toEqual(false);
    });
    test('toString should work', ()=>{
        expect(t1.toString()).toEqual('DOT');
    });
    test('sort tokens should work', ()=>{
        const aca = new _token.Token('ACA');
        const dot = new _token.Token('DOT');
        const acaausd = new _token.Token('lp://ACA/AUSD');
        const fa0 = new _token.Token('fa://0');
        const fa1 = new _token.Token('fa://1');
        const sa0 = new _token.Token('sa://0');
        const sa1 = new _token.Token('sa://1');
        // basic symbol & basic symbol
        expect(_token.Token.sort(aca, dot)).toEqual([
            aca,
            dot
        ]);
        expect(_token.Token.sort(dot, aca)).toEqual([
            aca,
            dot
        ]);
        // basic symbol & lp
        expect(_token.Token.sort(acaausd, aca)).toEqual([
            aca,
            acaausd
        ]);
        expect(_token.Token.sort(aca, acaausd)).toEqual([
            aca,
            acaausd
        ]);
        // basic symbol & foregin asset
        expect(_token.Token.sort(aca, fa0)).toEqual([
            aca,
            fa0
        ]);
        expect(_token.Token.sort(fa0, aca)).toEqual([
            aca,
            fa0
        ]);
        // foregin asset & foregin asset
        expect(_token.Token.sort(fa1, fa0)).toEqual([
            fa0,
            fa1
        ]);
        expect(_token.Token.sort(fa0, fa1)).toEqual([
            fa0,
            fa1
        ]);
        // basic symbol & stable pool
        expect(_token.Token.sort(aca, sa0)).toEqual([
            aca,
            sa0
        ]);
        expect(_token.Token.sort(sa0, aca)).toEqual([
            aca,
            sa0
        ]);
        // stable pool & stable pool
        expect(_token.Token.sort(sa1, sa0)).toEqual([
            sa0,
            sa1
        ]);
        expect(_token.Token.sort(sa0, sa1)).toEqual([
            sa0,
            sa1
        ]);
        // foregin & stable pool
        expect(_token.Token.sort(fa1, sa0)).toEqual([
            sa0,
            fa1
        ]);
        expect(_token.Token.sort(sa0, fa1)).toEqual([
            sa0,
            fa1
        ]);
    });
});

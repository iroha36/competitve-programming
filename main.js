'use strict';

// 階乗を計算する関数
function factorial(n) {
    // 入力値の検証
    if (n < 0) throw new Error('負の数の階乗は計算できません');
    if (!Number.isInteger(n)) throw new Error('整数を入力してください');
    
    function factorialTailCall(n, accum) {
        if (n === 0n) {
            return accum;
        }
        return factorialTailCall(n - 1n, n * accum);
    }
    // BigIntに変換して計算
    return factorialTailCall(BigInt(n), 1n);
}

// テスト
console.log(factorial(500)); // 30414093201713378043612608166064768844377641568960512000000000000nとなる
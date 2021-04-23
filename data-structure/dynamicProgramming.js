let fibonacciRecursionCounter = 0;
const fibonacciRecursion = (n=0) => {
  fibonacciRecursionCounter += 1;
  if(n < 3) return 1;
  return fibonacciRecursion(n - 2) + fibonacciRecursion(n - 1)
}

let memoCounter = 0
const memoFibonacci = (n=0, memo=[]) => {
  memoCounter++;
  if(n <= 2) return 1;
  if(memo[n]) {
    return memo[n]
  } else {
    memo[n] = memoFibonacci(n - 2, memo) + memoFibonacci(n - 1, memo)
  }

  return memo[n]
}

const memoFibonacciHelpers = (n=0) => {
  memoCounter = 0;
  let memo = [1];

  function helper(_n) {
    memoCounter++;
    if(memo[_n]) return memo[_n]
    if(_n <= 2) {
      return 1;
    }
    const res = helper(_n - 1) + helper(_n - 2)
    memo[_n] = res
    return res
  }
  helper(n)

  return memo[n]
}


// 空間複雜度比較低！ O(n)而已，不像遞迴需要每次都把上一個結果存在stack
const tabulatedFibonnaci = (n=0) => {
  memoCounter = 0
  let table = [0, 1, 1]
  for (let i = 3; i <= n; i++) {
    memoCounter++;
    table[i] = table[i - 1] + table[i - 2]
  }
  return table[n]
}

const n = 35
console.log(
  fibonacciRecursion(n), // 兩億次...，時間複雜度是O(2^n)，超級多次！
  fibonacciRecursionCounter,
)

console.log(
  memoFibonacci(n), // 只要(2n - 3次)，時間複雜度是O(n)
  memoCounter,
  memoFibonacciHelpers(n),
  memoCounter,
  tabulatedFibonnaci(n),
  memoCounter,
)

// tabulation solution
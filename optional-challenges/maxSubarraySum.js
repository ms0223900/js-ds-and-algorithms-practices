function maxSubarraySum(arr=[], limit=0) {
  if(arr.length === 0 || limit === 0 || limit > arr.length) {
    return null;
  }
  let start = 0;
  let sumNow = arr
    .slice(start, limit)
    .reduce((p, n) => p + n, 0)
  let max = sumNow;

  for (let i = 1; i <= arr.length - limit + 1; i++) {
    console.log(i, sumNow)
    max = Math.max(max, sumNow);
    sumNow = sumNow - arr[i - 1] + arr[i + limit - 1];
  }

  return max;
}

console.log(maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4))
// console.log(maxSubarraySum([100, 200, 300, 400], 2))
function SUM(arr=[]) {
  return arr.reduce((p, n) => p + n, 0)
}

function minSubArrayLen(arr=[], sum=0) {
  if(arr.length === 0 || sum === 0 || SUM(arr) < sum) {
    return 0;
  }
  let minLen = Infinity;
  let left = 0;
  let right = 0;
  let total = arr[0];
  
  while(right < arr.length) {
    // console.log(total, 'left: ', left, 'right: ', right)
    if(total >= sum) {
      const size = right - left + 1;
      minLen = Math.min(minLen, size)
      total -= arr[left];
      left++;
    }
    else {
      right++;
      total += arr[right]
    }
  }

  return minLen === Infinity ? 0 : minLen;
}

console.log(
  // minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11),
  // minSubArrayLen([2, 3, 1, 2, 4, 3], 7),
  minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 55)
)
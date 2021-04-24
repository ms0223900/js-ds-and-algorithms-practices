function sortedFrequency(nums=[], input=0) {
  // add whatever parameters you deem necessary - good luck!
  let middleIdx = Math.floor(nums.length / 2);
  let feq = 0;
  let middleNum = nums[middleIdx];
  if(input < nums[0] || input > nums.slice(-1)) return -1;
  while(middleIdx > 0 || middleIdx < nums.length) {
      if(input === middleNum) {
        feq++;
        break;
      }
      if(input < middleNum) {
          middleIdx = Math.floor(middleIdx / 2);
      } else {
          middleIdx = Math.floor((middleIdx + nums.length) / 2);
      }
      middleNum = nums[middleIdx];
  }
  let i = middleIdx - 1, j = middleIdx + 1;
  let prev = nums[i], next = nums[j];
  // 往前往後找
  while(prev === input) {
    feq++;
    i--;
    prev = nums[i];
  }
  while(next === input) {
    feq++;
    j++;
    next = nums[j];
  }

  return feq;
}

function sortedFrequencyLinear(nums=[], input=0) {
  let feq = 0;
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    num === input && feq++;
  }
  return feq;
}

const longNums = [
  1, 1, 2, 2, 2, 2, 3, 
  ...Array.from({ length: 1000000, }, () => 5), 
  ...Array.from({ length: 3,}, () => 10),
]

console.log(
  // sortedFrequency([1, 2, 2, 2, 2, 3], 1),
  sortedFrequency(longNums, 10),
  sortedFrequency(longNums, 12),
)
console.log(
  sortedFrequencyLinear(longNums, 10),
)
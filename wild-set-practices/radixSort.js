const getDigit = (num, i) => {
  if(i < 0 || (String(num).length - i - 1) < 0) return 0
  return Number(String(num)[String(num).length - i - 1])
}

const digitCount = (num=0) => String(num).length

const mostDigits = (nums=[]) => {
  let maxDigit = 0;
  nums.forEach(n => {
    maxDigit = Math.max(maxDigit, digitCount(n))
  })
  return maxDigit
}

const radixSort = (nums=[]) => {
  const maxDigit = mostDigits(nums);
  let res = [...nums]

  for (let i = 0; i < maxDigit; i++) {
    const bucket = Array.from({ length: 10 }, () => []);
    for (let j = 0; j < nums.length; j++) {
      const num = res[j]
      const digit = getDigit(num, i);
      bucket[digit].push(num)
    }
    res = bucket.flat()
  }

  return res
}

const nums = [10, 100, 1, 10000, 10000000]
const nums2 = [99, 4312948, 23124, 24812419241249, 24822222, 947274]

console.log(
  radixSort(nums),
  radixSort(nums2),
)
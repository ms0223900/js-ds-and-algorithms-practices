const helpers = {
  getDigit(num=0, i=0) {
    const strNum = String(num)
    const digit = Number(strNum[strNum.length - i - 1])
    return isNaN(digit) ? 0 : digit
  },

  // getDigit(num=0, i=0) {
  //   return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10
  // },

  digitCount(num=0) {
    if(num === 0) return 0
    return String(num).length
  },

  getMaxDigit(nums=[]) {
    let maxDigit = 0
    nums.forEach(num => {
      maxDigit = Math.max(maxDigit, this.digitCount(num))
    })
    return maxDigit
  },

  makeArrList(length=10) {
    return Array.from({ length, }, () => [])
  },
}

const radixSort = (nums=[]) => {
  const maxDigit = helpers.getMaxDigit(nums)
  let res = [...nums]

  for (let i = 0; i < maxDigit; i++) {
    const arrList = helpers.makeArrList(10)
    
    res.forEach(num => {
      const digit = helpers.getDigit(num, i)
      arrList[digit].push(num)
    })

    res = arrList.flat()
  }

  return res
}

console.log(
  radixSort([1, 10, 999, 10319301, 23, 1833])
)
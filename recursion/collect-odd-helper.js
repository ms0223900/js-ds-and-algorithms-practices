function collectOddHelper(nums=[]) {
  let res = [];

  function helper(helperInput) {
    if(helperInput.length === 0) {
      return;
    }
    if(helperInput[0] % 2 !== 0) {
      res.push(helperInput[0])
    }
    helper(helperInput.slice(1))
  }
  helper(nums)

  return res;
}

console.log(
  collectOddHelper([1, 2, 3, 4, 5])
)
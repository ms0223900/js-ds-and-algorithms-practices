function collectOddPure(arr=[]) {
  let res = [];

  if(arr.length === 0) {
    return res;
  }
  if(arr[0] % 2 !== 0) { //odd
    res = [
      ...res, arr[0],
    ]
  }
  res = [
    ...res, ...collectOddPure(arr.slice(1))
  ]

  return res;
}

console.log(
  collectOddPure([1, 2, 3, 4, 5])
)
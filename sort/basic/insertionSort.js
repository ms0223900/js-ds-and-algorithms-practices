const insertionSort = (arr=[]) => {
  let res = [...arr]

  for (let i = 1; i < arr.length; i++) {
    const currentVal = res[i];
    let outerJ = i - 1;
    for (let j = i - 1; j >= 0 && res[j] > currentVal; j--) {
      res[j + 1] = res[j]
      outerJ = j - 1
    }
    res[outerJ + 1] = currentVal;
  }

  return res
}

console.log(
  insertionSort([1, 3, 10, 4, 2])
)
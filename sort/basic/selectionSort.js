const swap = (arr) => (idx1, idx2) => {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}

const selectionSort = (arr=[]) => {
  let res = [...arr];
  for (let i = 0; i < arr.length; i++) {
    let lowesetIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if(res[lowesetIdx] > res[j]) {
        lowesetIdx = j
      }
    }
    if(lowesetIdx !== i) {
      swap(res)(lowesetIdx, i)
    }
  }
  return res
}

console.log(
  selectionSort([1, 3, 10, 5])
)
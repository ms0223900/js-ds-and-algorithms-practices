const swap = (arr=[], idx1=0, idx2=1) => {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}

const pivot = (arr=[], start=0, end=arr.length) => {
  let pivotIdx = start;
  const pivotEl = arr[start]

  for (let i = start + 1; i <= end; i++) {
    if(arr[i] < pivotEl) {
      pivotIdx++;
      swap(arr, pivotIdx, i)
    }
  }
  swap(arr, start, pivotIdx)
  // console.log(arr)
  return pivotIdx;
}

const quickSort = (arr=[], start=0, end=arr.length) => {
  if(start < end) {
    const pivotIdx = pivot(arr, start, end)
    // left
    quickSort(arr, start, pivotIdx - 1)
    // right
    quickSort(arr, pivotIdx + 1, end)
  }
  return arr
}

console.log(
  quickSort([3, 5, 4, 1, 8, 2, 9])
)
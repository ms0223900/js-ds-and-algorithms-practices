const getComparison = (comparitor) => (prev, next) => {
  return (typeof comparitor === 'function') ? 
    comparitor(prev, next) < 0 : prev < next
}

const swap = (arr=[], idx1=0, idx2=1) => {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}

// pure function
// const pivot = (arr, comparitor=undefined, start=0, end=arr.length-1) => {
//   let prevPivots = [];
//   let nextPivots = []
//   let pivotIdx = start;
//   let pivotEl = arr[pivotIdx]
//   if(arr.length === 0) return arr;
//   for (let i = start + 1; i <= end; i++) {
//     const el = arr[i];
//     getComparison(comparitor)(el, pivotEl) ?
//       prevPivots.push(el) && pivotIdx++ : nextPivots.push(el)
//   }
//   arr = [...prevPivots, pivotEl, ...nextPivots]
//   console.log(arr)
//   return pivotIdx;
// }

// not pure, but works
const pivot = (arr, comparitor=undefined, start=0, end=arr.length - 1) => {
  let pivotIdx = start;
  let pivotEl = arr[start]
  for (let i = start + 1; i <= end; i++) {
    const el = arr[i];
    const compared = getComparison(comparitor)(el, pivotEl);
    if(compared) {
      pivotIdx++;
      swap(arr, pivotIdx, i)
    }
  }
  swap(arr, start, pivotIdx)
  return pivotIdx;
}

const quickSort = (arr, comparitor=undefined, start=0, end=arr.length - 1) => {
  if(start < end) {
    const pivotIdx = pivot(arr, comparitor, start, end)
    console.log(start, pivotIdx, end)
    quickSort(arr, comparitor, start, pivotIdx - 1)
    quickSort(arr, comparitor, pivotIdx+1, end)
  }
  return arr
}

const nums = [3, 5, 4, 1, 8, 2, 9]
const dataList = [
  {
    age: 1,
    name: 'Kevin',
  },
  {
    age: 10,
    name: 'Peter',
  },
  {
    age: 2,
    name: 'Anna',
  },
  {
    age: 5,
    name: 'Sam',
  },
  {
    age: 4,
    name: 'Eson',
  },
]
const comparotors = {
  youngToOld: (prev, next) => prev.age - next.age,
  sortByLength: (p, n) => p.length - n.length,
}

console.log(
  // pivot(nums),
  // nums,
  quickSort(nums),
  quickSort(dataList, comparotors.youngToOld)
)
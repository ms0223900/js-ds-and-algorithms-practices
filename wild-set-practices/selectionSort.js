const swap = (arr, idx1, idx2) => {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}

// 以下方法的順序比較不直覺
// function selectionSort(arr=[], comparitor) {
//   for (let i = arr.length - 1; i > 0; i--) {
//     let lowestIdx = i
//     for (let j = 0; j < i; j++) {
//       const num = arr[j]
//       const min = arr[lowestIdx]
//       const comparison = 
//         (typeof comparitor === 'function') ? 
//           comparitor(min, num) : (min - num)
//       if(comparison < 0) {
//         lowestIdx = j
//       }
//     }
//     if(lowestIdx !== i) {
//       swap(arr, lowestIdx, i)
//     }
//   }
//   return arr;
// }

// 改成這樣，從左往右，把最小的放到最左邊
function selectionSort(arr=[], comparitor) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i
    for (let j = i + 1; j < arr.length; j++) {
      const num = arr[j];
      const min = arr[minIdx];
      const comparison = 
        (typeof comparitor === 'function') ? 
          comparitor(min, num) : (min - num)
      if(comparison > 0) {
        minIdx = j
      }
    }
    if(minIdx !== i) {
      swap(arr, minIdx, i)
    }
  }
  return arr;
}

const youngToOld = (prev, next) => prev.age - next.age

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
const nums = [
  10, 4, 2, 3, 1, 8,
]

console.log(
  selectionSort(dataList, youngToOld),
  selectionSort(nums),
)
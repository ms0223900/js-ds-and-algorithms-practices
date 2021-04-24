const swap = (arr, idx1, idx2) => {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}

function bubbleSort(arr=[], comparitor) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = arr.length - 1; j > i; j--) {
      const prev = arr[j-1]
      const next = arr[j]
      const comparison = 
          (typeof comparitor === 'function') ? 
            comparitor(prev, next) : (prev - next)
        if(comparison > 0) {
          swap(arr, j-1, j)
        }
    }
  }
  return arr
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
  bubbleSort(dataList, youngToOld),
  bubbleSort(nums),
)
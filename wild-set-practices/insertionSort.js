const swap = (arr, idx1, idx2) => {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}

const getComparison = (comparitor) => (prev, next) => {
  // console.log(prev, next)
  return (typeof comparitor === 'function') ? 
    comparitor(prev, next) : (prev - next)
}

function insertionSort(arr=[], comparitor) {
  for (let i = 1; i < arr.length; i++) {
    // 
    const current = arr[i];
    let j = i - 1;
    for (j; j >= 0 && getComparison(comparitor)(arr[j], current) > 0; j--) {
      arr[j + 1] = arr[j]
    }
    arr[j + 1] = current
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
  insertionSort(dataList, youngToOld),
  insertionSort(nums),
)
const getComparison = (prev, next, fn) => (
  typeof fn === 'function' ? fn(prev, next) < 0 : (prev - next < 0)
)

function merge(arr1=[], arr2=[], comparitor) {
  let res = [];
  let i = 0, j = 0;
  while(i < arr1.length && j < arr2.length) {
    const prev = arr1[i];
    const next = arr2[j]
    const comparison = getComparison(prev, next, comparitor)
    if(comparison) {
      res.push(prev)
      i++;
    } else {
      res.push(next)
      j++;
    }
  }
  // console.log(i, j)
  if(i < arr1.length) res.push(...arr1.slice(i))
  if(j < arr2.length) res.push(...arr2.slice(j))
  return res
}

const mergeSort = (arr, comparitor) => {
  if(arr.length <= 1) return arr;
  const middleIdx = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, middleIdx), comparitor)
  const right = mergeSort(arr.slice(middleIdx), comparitor)
  return merge(left, right, comparitor)
}

const nums1 = [1, 2, 5, 6, 9, 10]
const nums2 = [3, 4, 7, 8]

const dataList1 = [
  {
    age: 1,
    name: 'Kevin',
  },
  {
    age: 2,
    name: 'Anna',
  },
  {
    age: 4,
    name: 'Eson',
  },
  {
    age: 5,
    name: 'Sam',
  },
  {
    age: 10,
    name: 'Peter',
  },
]
const dataList2 = [
  {
    age: 11,
    name: 'Kevin',
  },
  {
    age: 12,
    name: 'Anna',
  },
  {
    age: 15,
    name: 'Sam',
  },
]
const comparotors = {
  youngToOld: (prev, next) => prev.age - next.age,
  sortByLength: (p, n) => p.length - n.length,
}

const names = ['123', '1234', '12345']
const otherNames = ['1', '4444', '7777777', '99999999']

const unsortedNames = ['4444', '7777777', '99999999', '1', '22', '333', '55555']

console.log(
  // merge(nums1, nums2),
  // merge([1,3,4,5], [2,4,6,8]),
  // merge(dataList1, dataList2, youngToOld),
  // merge(names, otherNames, comparotors.sortByLength),
  mergeSort(unsortedNames, comparotors.sortByLength),
)
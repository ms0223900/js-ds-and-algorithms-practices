const merge = (arr1=[], arr2=[]) => {
  let i = 0, j = 0;
  let res = [];
  while(i < arr1.length && j < arr2.length) {
    if(arr1[i] < arr2[j]) {
      res.push(arr1[i])
      i++;
    } else {
      res.push(arr2[j])
      j++;
    }
  }
  while(i < arr1.length) {
    res.push(arr1[i]);
    i++;
  }
  while(j < arr2.length) {
    res.push(arr2[j])
    j++;
  }
  return res
}

const mergeSort = (arr=[]) => {
  if(arr.length <= 1) return arr;
  const middleIdx = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, middleIdx))
  const right = mergeSort(arr.slice(middleIdx))
  return merge(left, right);
}

console.log(
  'Merge: ', merge([1, 3, 10], [4, 5])
)
console.log(
  mergeSort([1, 3, 10, 8, 2, 7, 5])
)
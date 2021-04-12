const binarySearch = (arr=[], val='') => {
  let left = 0;
  let right = arr.length - 1;
  let middleIdx = Math.floor((left + right) / 2)
  
  while(left <= right && arr[middleIdx] !== val) { 
    // 條件1. 如果val小於最小或大於最大，則比較停止
    // 條件2. 比較直到arr[middleIdx] === val
    if(val < arr[middleIdx]) {
      right = middleIdx - 1;
    } else {
      left = middleIdx + 1;
    }
    middleIdx = Math.floor((left + right) / 2)
  }

  return arr[middleIdx] === val ? middleIdx : -1;
}

console.log(
  binarySearch([1, 2, 3, 4, 5, 10], 10)
)


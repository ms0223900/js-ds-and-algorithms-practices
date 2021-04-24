function findRotatedIndex(nums=[], input=0) {
  let idx = -1;
  let first = 0;
  let last = nums.length - 1;
  let middleIdx = Math.floor((first + last) / 2)
  let middleNum = nums[middleIdx]
  if(nums[first] === input) return first;
  if(nums[last] === input) return last;

  while(first < last) {
    console.log(first, last, middleNum)
    if((nums[first] > nums[last] ) && last - first === 1) break;
    if(input === middleNum) {
      idx = middleIdx;
      break;
    }
    // 剛好對半sorted
    if(input >= nums[first] && input <= middleNum) {
      last = middleIdx
    }
    else if(input >= middleNum && input <= nums[last]) {
      first = middleIdx
    }
    // rotated在前
    else if(middleNum <= nums[first]) {
      if(input >= nums[middleIdx+1] && input <= nums[last]) {
        first = middleIdx
      } else {
        last = middleIdx
      }
    } 
    // rotated在後
    else {
      if(input >= nums[first] && input <= middleNum) {
        last = middleIdx
      } else {
        first = middleIdx
      }
    }
    middleIdx = Math.round((first + last) / 2)
    middleNum = nums[middleIdx]
  }
  return idx;
}

// function findRotatedIndex(nums=[], input=0) {

// }

console.log(
  findRotatedIndex([3, 4, 1, 2], 4),
  findRotatedIndex([4, 1, 2, 3], 3),
  findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8),
  findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4, 5, 5, 5], 8),
  findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4, 5, 5, 5], 6),
  findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4, 5, 5, 5], 1),
  findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4, 5, 5, 5], 9),
  findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4, 5, 5, 5], 5),
  // findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4, 5, 5, 5], 10),
)
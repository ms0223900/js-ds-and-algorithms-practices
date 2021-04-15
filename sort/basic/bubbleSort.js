const swap = (arr) => (idx1, idx2) => {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}

const bubbleSort = (arr=[]) => {
  let res = [...arr];

  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if(res[j] > res[j + 1]) { // 跟下一個比較
        swap(res)(j, j + 1)
      }
    }
  }

  return res;
}

// 用於優化那些"大致上"被排好的array
const optimizedBubbleSort = (arr=[]) => {
  let res = [...arr];
  let noNeedSwap = false;

  for (let i = arr.length - 1; i > 0; i--) {
    noNeedSwap = true;
    for (let j = 0; j < i; j++) {
      if(res[j] > res[j + 1]) { // 跟下一個比較
        swap(res)(j, j + 1)
        noNeedSwap = false
      }
    }
    if(noNeedSwap) break;
  }

  return res;
}

console.log(
  bubbleSort([1, 3, 10, 5, 2])
)
const swap = (arr=[], idx1=0, idx2=1) => {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}
class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  getParentIdx(idx=0) {
    return idx === 0 ? 0 : Math.floor((idx - 1) / 2);
  }
  getChildIdx(idx=0, leftRight='left') {
    return idx * 2 + (leftRight === 'left' ? 1 : 2)
  }
  // 自己寫的
  insert(val) {
    this.values.push(val);
    let currentIdx = this.values.length - 1;
    let parentIdx = this.getParentIdx(currentIdx);

    while(parentIdx < currentIdx) {
      const parentNode = this.values[parentIdx]
      if(parentNode < val) {
        swap(this.values, currentIdx, parentIdx)
        currentIdx = parentIdx;
      } else {
        break;
      }
      parentIdx = this.getParentIdx(currentIdx)
    }
    return this
  }

  // 另一個方法
  bubbleUp() {
    let currentIdx = this.values.length - 1;
    const el = this.values[currentIdx]
    while(currentIdx > 0) {
      const parentIdx = this.getParentIdx(currentIdx)
      const parent = this.values[parentIdx]
      if(el <= parent) break;
      // 交換
      this.values[parentIdx] = el;
      this.values[currentIdx] = parent;
      currentIdx = parentIdx;
    }
  }
  insert(val) {
    this.values.push(val);
    this.bubbleUp();
    return this;
  }

  // 自己寫的(初版)
  sinkDown() {
    let currentIdx = 0;
    const el = this.values[currentIdx];
    while(currentIdx < this.values.length - 1) {
      const leftChildIdx = this.getChildIdx(currentIdx, 'left')
      const leftChild = this.values[leftChildIdx]
      const rightChildIdx = this.getChildIdx(currentIdx, 'right')
      const rightChild = this.values[rightChildIdx]
      console.log(currentIdx, leftChild, rightChild)

      if(leftChild && rightChild) {
        if(el >= leftChild && el >= rightChild) break;
        if(leftChild > this.values[rightChildIdx]) {
          swap(this.values, leftChildIdx, currentIdx)
          currentIdx = leftChildIdx
        } else {
          swap(this.values, rightChildIdx, currentIdx)
          currentIdx = rightChildIdx
        }
      }
      else if(leftChild) {
        if(el >= leftChild) break;
        swap(this.values, leftChildIdx, currentIdx)
        currentIdx = leftChildIdx
      }
      else if(rightChild) {
        if(el >= rightChild) break;
        swap(this.values, rightChildIdx, currentIdx)
        currentIdx = rightChildIdx
      }
      break;
    }
  }
  sinkDown() {
    let currentIdx = 0;
    const length = this.values.length;
    const el = this.values[currentIdx];
    while(true) {
      const leftChildIdx = this.getChildIdx(currentIdx, 'left')
      const rightChildIdx = this.getChildIdx(currentIdx, 'right')
      let leftChild, rightChild;
      let swapIdx = null;

      if(leftChildIdx < length) {
        leftChild = this.values[leftChildIdx]
        if(leftChild > el) {
          swapIdx = leftChildIdx
        }
      }
      if(rightChildIdx < length) {
        rightChild = this.values[rightChildIdx]
        // 如果還沒換過而且右邊比較大 或是 已經有交換的idx而且比左邊還大
        if((!swapIdx && rightChild > el) || (swapIdx && rightChild > leftChild)) {
          swapIdx = rightChildIdx
        }
      }
      if(!swapIdx) break;

      swap(this.values, currentIdx, swapIdx);
      currentIdx = swapIdx;
    }
  }
  // 自己寫的遞迴
  sinkDownRecursion(currentIdx, idx1, idx2) {
    if((!this.values[idx1] && !this.values[idx2]) || 
      (this.values[currentIdx] >= this.values[idx1] && this.values[currentIdx] >= this.values[idx2])) {
      return;
    }
    if(this.values[idx1]) {
      if(this.values[currentIdx] < this.values[idx1]) {
        swap(this.values, currentIdx, idx1)
        this.sinkDownRecursion(idx1, this.getChildIdx(idx1, 'left'), this.getChildIdx(idx1, 'right'))
      }
    }
    if(this.values[idx2]) {
      if(this.values[currentIdx] < this.values[idx2]) {
        swap(this.values, currentIdx, idx2)
        this.sinkDownRecursion(idx2, this.getChildIdx(idx2, 'left'), this.getChildIdx(idx2, 'right'))
      }
    }
  }
  extractMax() {
    const first = this.values[0];
    swap(this.values, 0, this.values.length - 1);
    this.values.pop();
    this.sinkDown();
    // this.sinkDownRecursion(0, this.getChildIdx(0, 'left'), this.getChildIdx(0, 'right'))
    return first;
  }
}

const heap = new MaxBinaryHeap()
heap.insert(10).insert(20).insert(300).insert(3).insert(1000).insert(555);

// console.log(
//   'heap sample: ',
//   heap.values,
// )

console.log(
  [...heap.values],
  'heap extract max: ',
  heap.extractMax(),
  [...heap.values],
  heap.extractMax(),
  [...heap.values],
  heap.extractMax(),
  [...heap.values],
  heap.extractMax(),
  [...heap.values],
  heap.extractMax(),
  [...heap.values],
)
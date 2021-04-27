const swap = (arr, idx1, idx2) => {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
};

class BinaryHeap {
  constructor() {
    this.values = [];
  }

  getLastIdx() {
    return this.values.length - 1
  }

  findParentIdx(i=0) {
    if(i < 0 || i > this.values.length - 1) return -1;
    return Math.floor((i - 1) / 2);
  }
  findChild(i=0, leftOrRight='left') {
    if(i < 0 || i > this.values.length - 1) return -1;
    return i * 2 + (leftOrRight === 'left' ? 1 : 2);
  }

  bubbleUp() {
    let currentIdx = this.values.length - 1
    let parentIdx = this.findParentIdx(currentIdx);
    
    while(parentIdx >= 0) {
      const parent = this.values[parentIdx];
      const current = this.values[currentIdx];
      if(current > parent) {
        swap(this.values, currentIdx, parentIdx);
        currentIdx = parentIdx;
        parentIdx = this.findParentIdx(parentIdx);
      } else {
        break;
      }
    }
  }

  insert(val) {
    this.values.push(val);
    // 往上比較，如果child node比較大，則跟parent node交換
    this.bubbleUp();
    return this;
  }

  extractMax() {
    const max = this.values[0];
    swap(this.values, 0, this.getLastIdx());
    this.values.pop();
    this.sinkDown();
    return max;
  }

  sinkDown() {
    let currentIdx = 0;
    
    while(currentIdx < this.getLastIdx()) {
      let leftChildIdx = this.findChild(currentIdx, 'left');
      let rightChildIdx = this.findChild(currentIdx, 'right');
      let swapIdx;

      const current = this.values[currentIdx];
      const leftChild = this.values[leftChildIdx];
      const rightChild = this.values[rightChildIdx];

      if(rightChild && rightChild > current) {
        swapIdx = rightChildIdx;
      }
      if(leftChild) {
        if(
          (leftChild > current && !swapIdx) ||
          leftChild > rightChild && swapIdx
        ) {
          swapIdx = leftChildIdx;
        }
      }

      if(swapIdx) {
        swap(this.values, swapIdx, currentIdx);
      } else break;
      currentIdx = swapIdx;
    }
  }
}

const binaryHeap = new BinaryHeap()
binaryHeap.insert(10).insert(20).insert(30).insert(40).insert(50).insert(60);


console.log(
  binaryHeap.extractMax(),
  [...binaryHeap.values],
  binaryHeap.extractMax(),
  [...binaryHeap.values],
  binaryHeap.extractMax(),
  [...binaryHeap.values],
)
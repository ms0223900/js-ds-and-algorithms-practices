class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  getParentIdx(idx=0) {
    return idx === 0 ? 0 : Math.floor((idx - 1) / 2);
  }
  getChildIdx(idx=0, leftRight='left') {
    return idx * 2 + (leftRight === 'left' ? 1 : 2)
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const node = this.values[idx]

    while(idx > 0) {
      const parentIdx = this.getParentIdx(idx)
      const parentNode = this.values[parentIdx]
      if(parentNode.priority < node.priority) {
        this.values[parentIdx] = node;
        this.values[idx] = parentNode;
        idx = parentIdx;
      } else {
        break;
      }
    }
  }
  enqueue(val, priority) {
    const newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp()
    return this;
  }

  sinkDown() {
    let currentIdx = 0;
    const length = this.values.length;
    const node = this.values[currentIdx];
    while(true) {
      const leftIdx = this.getChildIdx(currentIdx, 'left')
      const rightIdx = this.getChildIdx(currentIdx, 'right')
      let swapIdx = null;
      let leftChild, rightChild;

      if(leftIdx < length) {
        leftChild = this.values[leftIdx]
        if(leftChild.priority > node.priority) {
          swapIdx = leftIdx;
        }
      }
      if(rightIdx < length) {
        rightChild = this.values[rightIdx]
        if(
          !swapIdx && rightChild.priority > node.priority ||
          swapIdx && rightChild.priority > leftChild.priority
        ) {
          swapIdx = rightIdx;
        }
      }
      if(!swapIdx) break;
      // 順序很重要! 先交換完再賦值
      this.values[currentIdx] = this.values[swapIdx];
      this.values[swapIdx] = node;
      currentIdx = swapIdx;
    }
  }
  dequeue() {
    const max = this.values[0];
    const end = this.values.pop()
    if(this.values.length > 0) {
      this.values[0] = end
      this.sinkDown()
    }
    return max;
  }
}

const pq = new PriorityQueue()
pq.enqueue(10, 1).enqueue('hi', 2).enqueue('undo', 5).enqueue('paste', 3)

console.log(
  pq.dequeue(),
  pq.dequeue(),
  pq.dequeue(),
  pq.dequeue(),
)
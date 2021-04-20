class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.end = null;
    this.length = 0;
  }

  enqueue(val) {
    const node = new Node(val);
    if(!this.first) {
      this.first = node;
      this.end = this.first;
    } else {
      this.end.next = node;
      this.end = node;
    }
    return ++this.length;
  }

  dequeue() {
    if(!this.first) return undefined;
    const originFirst = this.first;
    if(this.first === this.end) {
      this.first = null;
    }
    this.first = originFirst.next;
    this.length--;
    return originFirst.val;
  }
}
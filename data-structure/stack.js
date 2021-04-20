class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // 從頭進去，最新的在head
  unshift(val) {
    const node = new Node(val);
    if(!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      const originHead = this.head;
      this.head = node;
      this.head.next = originHead;
    }
    return this.length++;
  }

  // 從head拔出來
  shift() {
    if(!this.head) return undefined;
    const originHead = this.head;
    if(this.head === this.tail) {
      this.tail = null;
    }
    this.head = this.head.next;
    this.length--;
    return originHead.val;
  }
}

const stack = new Stack();
console.log(
  stack.unshift(10),
  stack.unshift(20),
  stack,
);

console.log(
  stack.shift(),
  stack,
);
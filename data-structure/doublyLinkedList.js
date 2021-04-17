class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  resetList() {
    this.head = null;
    this.tail = null;
  }
  print() {
    let res = [];
    let current = this.head
    while(current) {
      res.push(current.val)
      current = current.next
    }
    return res
  }

  shift() {
    if(!this.head) return undefined
    const shifted = this.head
    if(this.length === 1) {
      this.resetList();
    } else {
      this.head = shifted.next;
      this.head.prev = null;
      shifted.next = null;
    }
    this.length--;
    return shifted
  }
  unshift(val) {
    const newNode = new Node(val)
    if(!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      const originHead = this.head
      originHead.prev = newNode
      this.head = newNode
      this.head.next = originHead
    }
    this.length++;
    return this;
  }

  pop() {
    // 原本自己寫的
    // if(this.length === 1) {
    //   const originTail = this.tail
    //   this.head = null;
    //   this.tail = null;
    //   this.length--;
    //   return originTail
    // }
    // if(this.length > 1) {
    //   const originTail = this.tail
    //   this.tail = this.tail.prev
    //   this.tail.next = null
    //   this.length--;
    //   return originTail
    // }
    // return undefined

    // 優化過後
    if(!this.head) return undefined;
    const popped = this.tail
    if(this.length === 1) {
      this.resetList();
    } else {
      this.tail = popped.prev
      this.tail.next = null;
      popped.prev = null;
    }
    this.length--;
    return popped
  }
  push(val) {
    const newNode = new Node(val)
    if(!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode;
    }
    this.length++;
    return this
  }

  get(i=0) {
    const lastIndex = this.length - 1
    if(i < 0 || i > lastIndex) {
      return undefined
    }
    let counter, current;
    // 從頭開始
    if(i < Math.floor(this.length / 2)) {
      current = this.head;
      counter = 0;
      while(counter < i) {
        current = current.next
        counter++;
      }
      return current
    } 
    // 從尾巴
    else {
      current = this.tail;
      counter = lastIndex;
      while(counter > i) {
        current = current.prev
        counter--;
      }
      return current
    }
  }
  set(i, val) {
    const node = this.get(i)
    if(node) {
      node.val = val
      return true;
    }
    return false;
  }

  insert(i, val) {
    if(i < 0 || i > this.length) return false;
    if(i === 0) return !!this.unshift(val)
    if(i === this.length) return !!this.push(val)
    const node = this.get(i)
    const prevNode = node.prev
    const newNode = new Node(val)
    if(node) {
      newNode.prev = prevNode
      newNode.next = node
      prevNode.next = newNode
      node.prev = newNode
      this.length++;
      return true
    }
    return false
  }

  remove(i) {
    if(i < 0 || i > this.length) return undefined;
    if(i === 0) return this.shift()
    if(i === this.length - 1) return this.pop() 
    const removed = this.get(i)
    const prevNode = removed.prev
    const nextNode = removed.next
    if(removed) {
      prevNode.next = nextNode
      nextNode.prev = prevNode
      removed.prev = null
      removed.next = null
      this.length--;
      return removed
    }
  }

  reverse() {
    const originHead = this.head;
    this.head = this.tail;
    this.tail = originHead;
    let current = originHead
    let next = null;
    let prev = null
    
    for (let i = 0; i < this.length; i++) {
      next = current.next
      current.next = prev
      current.prev = next
      prev = current
      current = next
    }

    return this;
  }
}

const doublyLinkedList = new DoublyLinkedList()
doublyLinkedList.push(10).push(20).push(30).push(40).push(50)

// console.log(
//   doublyLinkedList,
// )

// console.log(
//   'pop method sample: ',
//   doublyLinkedList.pop(),
//   doublyLinkedList,
// )

// console.log(
//   'shift method sample: ',
//   doublyLinkedList.shift(),
//   doublyLinkedList,
// )

// console.log(
//   'unshift method sample: ',
//   doublyLinkedList.unshift(0),
//   doublyLinkedList.print(),
// )

// console.log(
//   'get method sample: ',
//   doublyLinkedList.get(0),
//   doublyLinkedList.get(1),
// )

// console.log(
//   'set method sample: ',
//   doublyLinkedList.set(0, 1234),
//   doublyLinkedList.print(),
// )

// console.log(
//   'insert method sample: ',
//   doublyLinkedList.insert(1, 222),
//   doublyLinkedList.print(),
// )

// console.log(
//   'remove method sample: ',
//   doublyLinkedList.remove(2),
//   doublyLinkedList.print(),
// )

console.log(
  'reverse method sample: ',
  doublyLinkedList.print(),
  doublyLinkedList.reverse().print(),
)
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // 從後面加進去
  push(val) {
    const node = new Node(val)
    if(!this.head) {
      this.head = node
      this.tail = this.head
    } else {
      this.tail.next = node
      this.tail = node
    }
    this.length++;
    return this;
  }

  // 找出所有node
  traverse() {
    let current = this.head;
    while(current) {
      current = current.next
    }
  }

  // 從後面拿出來
  // 自己的版本
  pop() {
    if(this.length === 0) {
      return undefined;
    }
    if(this.length === 1) {
      const tail = this.tail
      this.head = null;
      this.tail = null;
      this.length--;
      return tail;
    }
    if(this.length > 1) {
      let i = 0;
      let newLastNode = this.head
      const tail = this.tail
      while(i < this.length - 2) {
        newLastNode = this.head.next
        i++;
      }
      newLastNode.next = null;
      this.tail = newLastNode
      this.length--;
      return tail
    }
  }
  // 優化
  pop() {
    if(!this.head) return undefined;
    let current = this.head
    let newTail = current
    while(current.next) {
      newTail = current; // 最後一個之前
      current = current.next
    }
    newTail.next = null;
    this.tail = newTail;
    this.length--;
    if(this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current
  }

  // 從前面拿出來
  shift() {
    if(!this.head) return undefined;
    const head = this.head;
    this.head = this.head.next;
    this.length--;
    if(this.length === 0) {
      this.tail = null;
    }
    head.next = null;
    return head
  }
  // 從前面加進去
  unshift(val) {
    const node = new Node(val)
    if(!this.head) {
      this.head = node
      this.tail = this.head
    } else {
      let temp = this.head
      this.head = node
      this.head.next = temp
    }
    this.length++;
    return this
  }

  get(i=0) {
    if(i < 0 || i > this.length - 1 || !this.head) {
      return null;
    }
    let idx = 0;
    let node = this.head
    while(idx < i) {
      node = node.next;
      idx++;
    }
    return node
  }

  // set(i, val) {
  //   if(i >= 0 && i < this.length) {
  //     let idx = 0;
  //     let node = this.head;
  //     while(idx < i) {
  //       node = node.next
  //       idx++;
  //     }
  //     node.value = val
  //   } 
  //   return this;
  // }
  // 優化set
  set(i, value) {
    const foundNode = this.get(i)
    if(foundNode) {
      foundNode.value = value
      return true
    }
    return false
  }

  // 插入指定位置node
  insert(i, value) {
    // if(i === 0) return !!this.unshift(value);
    // if(i === this.length) return !!this.push(value)

    // let prevNode = this.get(i - 1)
    // if(prevNode) {
    //   const newNode = new Node(value)
    //   let temp = prevNode.next
    //   prevNode.next = newNode;
    //   newNode.next = temp;
    //   this.length++;
    //   return true;
    // }
    // return false;
    if(i < 0 || i > this.length - 1) return false;
    if(i === 0) return !!this.unshift(value);
    if(!this.head || i === this.length) return this.push(value);
    
    const newNode = new Node(value);
    let idx = 0;
    let prevNode = this.head;
    while(idx < i - 1) {
        prevNode = prevNode.next;
        idx++;
    }
    const nextNode = prevNode.next;
    prevNode.next = newNode;
    newNode.next = nextNode;
    this.length++;
    return true;
  }

  // 移除指定位置node
  remove(i) {
    if(i === 0) return this.shift();
    if(i === this.length - 1) return this.pop();
    if(i < 0 || i > this.length - 1) return undefined;

    const prevNode = this.get(i - 1)
    if(prevNode) {
      const removedNode = prevNode.next
      const nextNode = removedNode.next
      removedNode.next = null
      prevNode.next = nextNode
      this.length--;
      return removedNode
    }
    return undefined
  }

  print() {
    let res = []
    let currentNode = this.head;
    while(currentNode) {
      res.push(currentNode.value)
      currentNode = currentNode.next
    }
    // console.log(res)
    return res
  }

  // 反轉，下一個的next指定為上一個
  reverse() {
    const originHead = this.head
    this.head = this.tail
    this.tail = originHead
    let currentNode = originHead
    let next;
    let prev = null;

    for (let i = 0; i < this.length; i++) {
      next = currentNode.next;
      currentNode.next = prev; // 這個的下一個是上一個
      // 遞移到下一輪(i + 1)
      prev = currentNode; // 在下一輪，上一個node是目前現在的
      currentNode = next; // 在下一輪，現在的node是目前下一個
    }
    return this;
  }

  rotate(i=0) {
    let _i = i % this.length;
    if(_i === 0) return;
    if(i < 0) {
      _i = this.length + i
    }

    const prevNode = this.get(_i);
    const originHead = this.head;
    const originTail = this.tail;
    if(prevNode) {
      this.head = prevNode;
      originTail.next = originHead;
      let idx = 0;
      let newTail = originHead;
      // 尾巴是到i的前一個
      while(idx < _i - 1) {
        newTail = newTail.next;
        idx++;
      }
      newTail.next = null;
      this.tail = newTail;
    }
  }
}

function main() {
  const linkedList = new SinglyLinkedList()
  linkedList.push(10).push(20).push(30).push(40)
  // console.log(linkedList)

  // console.log(
  //   'pop method sample: ',
  //   linkedList.pop(),
  //   linkedList.pop(),
  //   linkedList.pop(),
  // )

  // console.log(
  //   'shift method sample: ',
  //   linkedList.shift(),
  //   linkedList.shift(),
  //   linkedList.shift(),
  // )

  // console.log(
  //   'unshift method sample: ',
  //   linkedList.unshift(233).unshift(10),
  // )

  // console.log(
  //   'get method sample: ',
  //   linkedList.get(0),
  //   linkedList.get(1),
  //   linkedList.get(2),
  //   linkedList.get(3),
  // )

  // console.log(
  //   'set method sample: ',
  //   linkedList.set(0, 1234)
  // )

  console.log(
    'rotate method sample: ',
    linkedList.rotate(0),
    linkedList.print(),
    linkedList.rotate(-1),
    linkedList.print(),
    // linkedList.rotate(2),
    // linkedList.print(),
    linkedList.rotate(3),
    linkedList.print(),
  )

  console.log(
    'insert method sample: ',
    linkedList.print(),
    linkedList.insert(1, 22223),
    linkedList.print(),
  //   linkedList.get(2),
  )

  // console.log(
  //   'remove method sample: ',
  //   linkedList.remove(2),
  //   linkedList,
  // )

  console.log(
    'reverse method sample: ',
    // linkedList,
    linkedList.print(),
    linkedList.reverse().print(),
  )
}

function rotateSample() {
  const singlyLinkedList = new SinglyLinkedList()
  singlyLinkedList.push(5).push(10).push(15).push(20).push(25)
  singlyLinkedList.rotate(3)
  console.log(
    singlyLinkedList.head.value,
    singlyLinkedList.head.next.value,
    singlyLinkedList.head.next.next.value,
    singlyLinkedList.head.next.next.next.value,
    singlyLinkedList.head.next.next.next.next.value,
    singlyLinkedList.tail.value,
    singlyLinkedList.tail.next,
  )
}
rotateSample()

function rotateSample2() {
  const singlyLinkedList = new SinglyLinkedList()
  singlyLinkedList.push(5).push(10).push(15).push(20).push(25)
  singlyLinkedList.rotate(-1)
  console.log(
    singlyLinkedList.head.value,
    singlyLinkedList.head.next.value,
    singlyLinkedList.head.next.next.value,
    singlyLinkedList.head.next.next.next.value,
    singlyLinkedList.head.next.next.next.next.value,
    singlyLinkedList.tail.value,
    singlyLinkedList.tail.next,
  )
}
rotateSample2()

function rotateSample3() {
  const singlyLinkedList = new SinglyLinkedList()
  singlyLinkedList.push(5).push(10).push(15).push(20).push(25)
  singlyLinkedList.rotate(1000)
  console.log(
    singlyLinkedList.head.value,
    singlyLinkedList.head.next.value,
    singlyLinkedList.head.next.next.value,
    singlyLinkedList.head.next.next.next.value,
    singlyLinkedList.head.next.next.next.next.value,
    singlyLinkedList.tail.value,
    singlyLinkedList.tail.next,
  )
}
rotateSample3()
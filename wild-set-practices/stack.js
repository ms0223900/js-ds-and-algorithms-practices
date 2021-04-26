class Node {
  constructor(value) {
      this.value = value;
      this.next = null;
  }
}

function stackByTwoQueue() {
  class Stack {
      constructor() {
        this.preparedQueue = new Queue()
        this.workingQueue = new Queue()
      }

      push(val) {
        this.workingQueue.enqueue(val);
        return this;
      }

      pop() {
        let node = this.workingQueue.first;
        while(this.workingQueue.size - 1 > 0) {
          node = this.workingQueue.dequeue()
          this.preparedQueue.enqueue(node)
        }
        node = this.workingQueue.last;
        this.workingQueue = this.preparedQueue
        this.preparedQueue = new Queue()

        return node ? node.value : node;
      }
  }

  class Queue {
      constructor() {
          this.first = null;
          this.last = null;
          this.size = 0;
      }
      enqueue(data) {
          var node = new Node(data);

          if (!this.first) {
              this.first = node;
              this.last = node;
          } else {
              this.last.next = node;
              this.last = node;
          }

          return ++this.size;
      }

      dequeue() {
          if (!this.first) return null;

          var temp = this.first;
          if (this.first == this.last) {
              this.last = null;
          }
          this.first = this.first.next;
          this.size--;
          return temp.value;
      }
  }

  const stack = new Stack()
  stack.push(10).push(20).push(30)
  console.log(
    stack.pop(),
    stack.pop(),
    stack.pop(),
    stack.pop(),
    stack.push(30).push(40).push(50),
    stack.pop(),
    stack.push(60),
    stack.pop(),
  )
}
// stackByTwoQueue()

function basicStack() {
  class Stack {
    constructor() {
      this.first = null;
      this.last = null;
      this.size = 0;
    }

    push(val) {
      const node = new Node(val)
      if(!this.first) {
        this.first = node
        this.last = this.first
      } else {
        node.next = this.first;
        this.first = node
      }
      this.size++;
      // return this;
      return this.size;
    }

    pop() {
      if(!this.first) return undefined;

      let popped = this.first;
      if(this.size === 1) {
        this.first = null;
        this.last = this.first;
      } 
      else {
        this.first = popped.next;
      }

      this.size--;
      return popped.value
    }
  }

  const stack = new Stack()
  
  console.log(
    stack.push(10),
    stack.first.value,
  )
}
// basicStack()

function queueDequeue() {
  class Queue {
    constructor() {
      this.first = null;
      this.last = null;
      this.size = 0;
    }

    enqueue(val) {
      const node = new Node(val)
      if(!this.first) {
        this.first = node;
        this.last = this.first;
      } else {
        this.last.next = node;
        this.last = node;
      }
      this.size++;
      return this.size;
    }
  }

  const q = new Queue()

  console.log(
    q.enqueue(10),
    q.size,
    q.enqueue(100),
    q.size,
    q.enqueue(1000),
    q.size,
    q,
  )
}
queueDequeue()
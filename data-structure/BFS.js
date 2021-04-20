class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BFSTreeSample {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const node = new Node(val)
    if(!this.root) {
      this.root = node;
      return this;
    }
    let currentNode = this.root;
    while(true) {
      if(currentNode.val === val) {
        return this;
      }
      // 比較小，往左找
      if(val < currentNode.val) {
        // 是空的就塞進去
        if(currentNode.left === null) {
          currentNode.left = node;
          return this
        }
        currentNode = currentNode.left;
      } else {
        // 是空的就塞進去
        if(currentNode.right === null) {
          currentNode.right = node;
          return this;
        }
        currentNode = currentNode.right;
      }
    }
  }

  // 廣度搜尋，也可以不加上val的參數，來找所有節點
  BFS(val) {
    let queue = [this.root];
    let visited = [];
    while(queue.length > 0) {
      const node = queue.shift() // 這很重要，先進的先出，先以left, right去找，所以是「廣度優先」
      visited.push(node.val)
      if(node.val === val) break;
      if(node.left) {
        queue.push(node.left)
      }
      if(node.right) {
        queue.push(node.right)
      }
    }
    return visited;
  }

  // 最基本的DFS
  DFS(val) {
    let queue = [this.root];
    let visited = [];
    while(queue.length > 0) {
      const node = queue.pop() // 這很重要，後進的先出，先往子節點找，所以是「深度優先」
      visited.push(node.val)
      if(node.val === val) break;
      if(node.left) {
        queue.push(node.left)
      }
      if(node.right) {
        queue.push(node.right)
      }
    }
    return visited;
  }

  // 其他order寫法，方法都是深入某一方的節點將其印出來，差別在於將查過的節點放進visited的時機
  DFSPreOrder() {
    let visited = [];
    const traverse = (node) => {
      visited.push(node.val)
      if(node.left) traverse(node.left)
      if(node.right) traverse(node.right)
    }
    traverse(this.root)
    return visited
  }
  // 剛好是由小到大印出來
  DFSInOrder() {
    let visited = [];
    const traverse = (node) => {
      if(node.left) traverse(node.left)
      visited.push(node.val)
      if(node.right) traverse(node.right)
    }
    traverse(this.root)
    return visited
  }
  // 會先找「葉」節點（沒有子節點的節點）
  DFSPostOrder() {
    let visited = [];
    const traverse = (node) => {
      if(node.left) traverse(node.left)
      if(node.right) traverse(node.right)
      visited.push(node.val)
    }
    traverse(this.root)
    return visited
  }
}

const tree = new BFSTreeSample()
tree.insert(10).insert(20).insert(30).insert(5).insert(18).insert(22)

console.log(
  'BFS sample: ',
  tree.BFS(30),
  tree.DFS(30),
  tree.DFSPreOrder(),
  tree.DFSInOrder(),
  tree.DFSPostOrder(),
)
class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
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

  find(val) {
    if(!this.root) return false;
    let currentNode = this.root;
    while(currentNode) {
      if(val === currentNode.val) break;
      if(val < currentNode.val) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right
      }
    }
    return currentNode ? currentNode : false;
  }

  contains(val) {
    const foundRes = this.find(val);
    return foundRes ? true : false;
  }
}

const tree = new BinarySearchTree();
tree.insert(10).insert(20).insert(5).insert(22).insert(3)

console.log(
  tree,
  tree.find(20),
  tree.contains(3),
  tree.find(222),
  tree.contains(222),
)
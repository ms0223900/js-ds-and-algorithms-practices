class Node {
  constructor(value) {
    this.value = value;
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
      this.root = node
    } else {
      let currentNode = this.root;
      while(true) {
        if(node.value > currentNode.value) {
          if(currentNode.right) {
            currentNode = currentNode.right
          } else {
            currentNode.right = node
            break;
          }
        } else {
          if(currentNode.left) {
            currentNode = currentNode.left;
          } else {
            currentNode.left = node;
            break;
          }
        }
      }
    }

    return this;
  }

  find(val) {
    if(!this.root) return undefined;
    let current = this.root;

    while(current) {
      if(val === current.value) return current;
      if(val > current.value) {
        current = current.right;
      } else {
        current = current.left;
      }
    }

    return undefined;
  }

  findMin(root=this.root) {
    if(!root) return undefined;
    let current = root;
    while(current.left) {
      current = current.left
    }
    return current;
  }
  findMax(root=this.root) {
    if(!root) return undefined;
    let current = root;
    while(current.right) {
      current = current.right
    }
    return current;
  }

  dfsPreOrder(node=this.root, visited=[]) {
    if(!node) return visited;
    
    visited.push(node.value);
    if(node.left) this.dfsPreOrder(node.left, visited);
    if(node.right) this.dfsPreOrder(node.right, visited);

    return visited;
  }

  dfsInOrder(node=this.root, visited=[]) {
    if(!node) return visited;
    
    if(node.left) this.dfsInOrder(node.left, visited);
    visited.push(node.value);
    if(node.right) this.dfsInOrder(node.right, visited);

    return visited;
  }

  dfsPostOrder() {
    let visited = [];
    if(!this.root) return visited;

    function traverse(node) {
      if(node.left) traverse(node.left);
      if(node.right) traverse(node.right);
      visited.push(node.value);
    }
    traverse(this.root);
    return visited;
  }

  breadthFirstSearch() {
    if(!this.root) return [];

    let visited = [];
    let queue = [this.root];

    while(queue.length) {
      const first = queue.shift()
      if(first.left) queue.push(first.left)
      if(first.right) queue.push(first.right)

      visited.push(first.value)
    }
    return visited;
  }

  remove(val, root=this.root) {
    if(!root) return root;
    
    // 從左找最大
    if(val < root.value) {
      root.left = this.remove(val, root.left)
    }
    else if(val > root.value) {
      root.right = this.remove(val, root.right)
    }
    // 找到該點了
    else {
      // 沒左邊就找右邊
      if(!root.left) {
        const right = root.right;
        root = null;
        return right;
      }
      // 沒右邊邊就找左邊
      if(!root.right) {
        const left = root.left;
        root = null;
        return left;
      }
      // 如果左右都有

      // 從右找最小(或從左找最大也可以)
      // const minNode = this.findMin(root.right)
      // root.value = minNode.value;
      // // 往右繼續遞迴
      // root.right = this.remove(minNode.value, root.right)

      // 往左找最大
      const maxNode = this.findMax(root.left)
      root.value = maxNode.value
      // 往左繼續遞迴
      root.left = this.remove(maxNode.value, root.left)
    }
    return root
  }

  findSecondLargest() {
    if(!this.root) return undefined;
    if(!this.root.right) return undefined;
    let current = this.root;
    let max = current.right;
    
    while(max.right) {
      current = max;
      max = max.right;
    }
    if(max.left) {
      current = this.findMax(max.left)
    }
    return current;
  }

  isLeafOrFullfil(root=this.root) {
    if(!root) return true;
    if(
      (root.left && root.right) ||
      (!root.left && !root.right)
    ) return true;
    return false;
  }

  isSingleNodeBalanced(node) {
    if(this.isLeafOrFullfil(node)) return true;
    if(node.left) return this.isLeafOrFullfil(node.left);
    if(node.right) return this.isLeafOrFullfil(node.right);
    return false;
  }

  isBalanced(root=this.root) {
    if(!this.root) return true;
    const isSingleBalanced = this.isSingleNodeBalanced(root)
    // console.log(root.value, isSingleBalanced)
    if(!isSingleBalanced) {
      return false;
    }

    if(root.left) {
      return this.isBalanced(root.left)
    }
    if(root.right) {
      return this.isBalanced(root.right)
    }
    return true;
  }
}

const bst = new BinarySearchTree()

bst.insert(15).insert(20).insert(10).insert(12).insert(1).insert(5).insert(50);

// console.log(
//   bst.root.left.right.value,
//   bst.find(10),
// )

// console.log(
//   'dfs(preOrder): ', bst.dfsPreOrder(),
//   'dfs(inOrder): ', bst.dfsInOrder(),
//   'dfs(postOrder): ', bst.dfsPostOrder(),
// )

// console.log(
//   'bfs: ', bst.breadthFirstSearch(),
// )

// console.log(
//   'remove node: ', bst.remove(15),
//   bst.breadthFirstSearch(),
// )

// console.log(
//   'find second max: ', bst.findSecondLargest()
// )

(function() {
  const _bst = new BinarySearchTree()
  _bst.insert(15).insert(20).insert(10).insert(12)

  console.log('check tree is balanced: ', _bst.isBalanced())
  _bst.insert(13)
  console.log('check tree is balanced: ', _bst.isBalanced())

  const _bst2 = new BinarySearchTree()
  _bst2.insert(5).insert(6).insert(7)
  console.log(
    'check tree is balanced: ', _bst2.isBalanced()
  )
}())
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vtx) {
    if(!this.adjacencyList[vtx]) this.adjacencyList[vtx] = [];
    return this;
  }
  removeVertex(vtx) {
    delete this.adjacencyList[vtx];
    for (const vtxKey in this.adjacencyList) {
      this.adjacencyList[vtxKey].filter(v => v !== vtx)
    }
    return this;
  }
  
  addEdge(vtx1, vtx2) {
    if(this.adjacencyList[vtx1] && this.adjacencyList[vtx2]) {
      this.adjacencyList[vtx1].push(vtx2);
      this.adjacencyList[vtx2].push(vtx1)
    }
    return this;
  }
  removeEdge(vtx1, vtx2) {
    if(this.adjacencyList[vtx1] && this.adjacencyList[vtx2]) {
      this.adjacencyList[vtx1].filter(v => v !== vtx2);
      this.adjacencyList[vtx2].filter(v => v !== vtx1);
    }
    return this;
  }

  dfsStack(start) {
    if(!this.adjacencyList[start]) return [];
    let stack = [start];
    let visited = {};
    let res = [];

    while(stack.length) {
      const popped = stack.pop();
      res.push(popped);
      visited[popped] = true;
      for (const _vtx of this.adjacencyList[popped]) {
        if(!visited[_vtx]) {
          stack.push(_vtx);
          visited[_vtx] = true;
        }
      }
    }
    return res;
  }
  dfsRecursion(vtx, visited={}, result=[]) {
    if(!this.adjacencyList[vtx] || !vtx) return result;
    visited[vtx] = true;
    result.push(vtx);
    for (const _vtx of this.adjacencyList[vtx]) {
      if(!visited[_vtx]) {
        this.dfsRecursion(_vtx, visited, result);
      }
    }
    return result;
  }

  breadthFirstSearch(start) {
    if(!this.adjacencyList[start] || !start) return [];
    let visited = {};
    let queue = [start];
    let res = [];

    while(queue.length) {
      const dequeued = queue.shift();
      res.push(dequeued);
      visited[dequeued] = true;
      for (const _vtx of this.adjacencyList[dequeued]) {
        if(!visited[_vtx]) {
          queue.push(_vtx);
          visited[_vtx] = true;
        }
      }
    }
    return res;
  }
}

const graph = new Graph;
graph.addVertex('A').addVertex('B').addVertex('C').addVertex('D')

// console.log(
//   {...graph.adjacencyList},
//   graph.removeVertex('B'),
// )

graph.addEdge('A', 'B').addEdge('A', 'C').addEdge('B', 'C').addEdge('C', 'D').addEdge('D', 'B')
console.log(
  graph.adjacencyList,
  graph.dfsStack('A'),
  graph.dfsRecursion('A'),
  graph.breadthFirstSearch('A'),
)
class Graph {
  constructor() {
    this.adjacencyList = {}
  }

  addVertex(val) {
    if(!this.adjacencyList[val]) {
      this.adjacencyList[val] = []
    }
    return this;
  }
  removeVertex(vertex) {
    delete this.adjacencyList[vertex];
    for (const _vertex in this.adjacencyList) {
      this.adjacencyList[_vertex] = this.adjacencyList[_vertex].filter(v => v !== vertex)
    }
    return this;
  }
  // 更好的方法
  removeVertex(vertex) {
    while(this.adjacencyList[vertex].length) {
      const v = this.adjacencyList[vertex].pop()
      this.removeEdge(v, vertex)
    }
    delete this.adjacencyList[vertex];
    return this;
  }
  
  addEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] && this.adjacencyList[vertex1].push(vertex2)
    this.adjacencyList[vertex2] && this.adjacencyList[vertex2].push(vertex1)
    return this
  }
  removeEdge(v1, v2) {
    if(this.adjacencyList[v1]) {
      this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2)
    }
    if(this.adjacencyList[v2]) {
      this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1)
    }
    return this;
  }

  depthFirstRecursive(vertex, result=[], visited={}) {
    if(!vertex || !this.adjacencyList[vertex]) return result;
    result.push(vertex);
    visited[vertex] = true
    for (const _neighbor of this.adjacencyList[vertex]) {
      if(!visited[_neighbor]) {
        this.depthFirstRecursive(_neighbor, result, visited)
      }
    }
    return result;
  }

  // helper
  depthFirstRecursiveWithHelper(startVertex) {
    let result=[];
    let visited={};
    const adjacencyList = this.adjacencyList;

    (function dfsHelper(vertex) {
      if(!vertex) return null;
      result.push(vertex);
      visited[vertex] = true
      // for (const _neighbor of adjacencyList[vertex]) {
      //   if(!visited[_neighbor]) {
      //     // 用return沒辦法全都找到，會在第一個找到就return
      //     // 如果要用return 要用forEach
      //     dfsHelper(_neighbor)
      //   }
      // }
      adjacencyList[vertex].forEach(_neighbor => {
        if(!visited[_neighbor]) {
          // 如果用return 要用forEach
          return dfsHelper(_neighbor)
        }
      })
    }(startVertex))

    return result;
  }

  dfsIterative(startVertex) {
    let res = [];
    let stack = [startVertex];
    let visited = {};
    const adjacencyList = this.adjacencyList
    if(!startVertex || !adjacencyList[startVertex]) return res;

    while(stack.length) {
      const vertex = stack.pop()
      res.push(vertex)
      visited[vertex] = true
      for (const _neighbor of adjacencyList[vertex]) {
        if(!visited[_neighbor]) {
          stack.push(_neighbor)
        }
      }
    }
    return res
  }

  bfsIterative(startVertex) {
    let res = [];
    let queue = [startVertex];
    let visited = {};
    const adjacencyList = this.adjacencyList
    if(!startVertex || !adjacencyList[startVertex]) return res;

    while(queue.length) {
      const vertex = queue.shift(); // 只改這裡，
      res.push(vertex)
      visited[vertex] = true
      for (const _neighbor of adjacencyList[vertex]) {
        if(!visited[_neighbor]) {
          queue.push(_neighbor)
        }
      }
    }
    return res
  }
}

const graph = new Graph()
graph.addVertex('HongKong').addVertex('Macau').addVertex('Tokyo').addVertex('Kyoto')
graph.addEdge('HongKong', 'Tokyo').addEdge('HongKong', 'Macau').addEdge('Tokyo', 'Kyoto')

// console.log(
//   {...graph.adjacencyList},
//   {...graph.removeEdge('Macau', 'HongKong').adjacencyList},
//   {...graph.removeVertex('HongKong').adjacencyList},
// )

console.log(
  'DFS: ',
  graph,
  // graph.depthFirstRecursive('Tokyo'),
  // 這兩個不一樣是正常的，一個是從左找，一個從右邊找
  graph.depthFirstRecursiveWithHelper('Tokyo'), // 先往左邊找
  graph.dfsIterative('Tokyo'), // 先往右邊找
  'BFS: ', // 先找完鄰居
  graph.bfsIterative('Tokyo'),
)
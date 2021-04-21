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
}

const graph = new Graph()
graph.addVertex('HongKong').addVertex('Macau').addVertex('Tokyo').addVertex('Kyoto')
graph.addEdge('HongKong', 'Tokyo').addEdge('HongKong', 'Macau')

console.log(
  {...graph.adjacencyList},
  {...graph.removeEdge('Macau', 'HongKong').adjacencyList},
  {...graph.removeVertex('HongKong').adjacencyList},
)
class PriorityQueue {
  constructor() {
    this.queue = []
  }
  enqueue(val, priority) {
    this.queue.push({ val, priority, })
    this.sort()
  }
  dequeue() {
    return this.queue.shift();
  }
  sort() {
    this.queue.sort((prev, next) => prev.priority - next.priority)
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = []
  }
  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push({ node: v2, weight, })
    this.adjacencyList[v2].push({ node: v1, weight, })
  }

  getInitDataForShortDistance(start) {
    let distances = {};
    const nodeList = new PriorityQueue()
    const previous = {};
    for (const v in this.adjacencyList) {
      if(v === start) {
        distances[v] = 0;
        nodeList.enqueue(v, 0)
      } else {
        distances[v] = Infinity;
        nodeList.enqueue(v, Infinity)
      }
      previous[v] = null
    }
    return ({
      distances, nodeList, previous,
    });
  }
  
  Dijkstra(start, end) {
    let {
      distances, nodeList, previous,
    } = this.getInitDataForShortDistance(start)
    let resPath = [];
    let smallestNode = undefined;

    while(nodeList.queue.length) {
      // console.log(nodeList)
      smallestNode = nodeList.dequeue().val
      console.log(smallestNode)
      // 當找到最後目標時
      if(smallestNode === end) {
        while(previous[smallestNode]) {
          resPath.push(smallestNode)
          smallestNode = previous[smallestNode]
        }
        break;
      }
      if(smallestNode || distances[smallestNode] !== Infinity) {
        for (const nextNode of this.adjacencyList[smallestNode]) {
          // 下一個節點的node值
          const neighborNode = nextNode.node
          // 目前的最小值 + 下個節點的權重
          const candidateWeight = distances[smallestNode] + nextNode.weight;
          // 比較新的值是否有比較小
          if(candidateWeight < distances[neighborNode]) {
            // 如果有則更新
            distances[neighborNode] = candidateWeight
            previous[neighborNode] = smallestNode
            nodeList.enqueue(neighborNode, candidateWeight)
          }
        }
      }
    }
    return resPath.concat(smallestNode).reverse();
  }
}

const graph = new WeightedGraph()
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A","B", 4);
graph.addEdge("A","C", 2);
graph.addEdge("B","E", 3);
graph.addEdge("C","D", 2);
graph.addEdge("C","F", 4);
graph.addEdge("D","E", 3);
graph.addEdge("D","F", 1);
graph.addEdge("E","F", 1);

console.log(
  graph,
  graph.Dijkstra('A', 'E')
)
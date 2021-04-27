class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, prioriy) {
    this.values.push({ val, prioriy, });
    this.sort();
    return this;
  }
  dequeue() {
    return this.values.shift()
  }
  sort() {
    this.values.sort((prev, next) => prev.prioriy - next.prioriy)
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = [];
  }

  addVtx(vtx) {
    this.adjacencyList[vtx] = [];
    return this;
  }

  addEdge(vtx1, vtx2, weight) {
    this.adjacencyList[vtx1].push({ node: vtx2, weight, });
    this.adjacencyList[vtx2].push({ node: vtx1, weight, });
    return this;
  }

  getDijkstraInitData(start) {
    let prevDistances = {};
    let previousNodes = {};
    const nodeList = new PriorityQueue()
    for (const vtx in this.adjacencyList) {
      prevDistances[vtx] = Infinity;
      previousNodes[vtx] = null;
      vtx === start ? nodeList.enqueue(vtx, 0) : nodeList.enqueue(vtx, Infinity);
    }
    prevDistances[start] = 0;
    return ({
      prevDistances, 
      previousNodes,
      nodeList,
    })
  }

  dijkstra(start, end) {
    let {
      prevDistances, previousNodes, nodeList,
    } = this.getDijkstraInitData(start);
    let res = [];

    while(nodeList.values.length) {
      let node = nodeList.dequeue().val;

      if(node === end) {
        while(previousNodes[node]) {
          res.push(node);
          node = previousNodes[node];
        }
        break;
      }

      else if(node || prevDistances[node] !== Infinity) {
        for (const {
          node: neighborNode, weight: neighborWeight,
        } of this.adjacencyList[node]) {
          const newDistance = prevDistances[node] + neighborWeight;
          if(newDistance < prevDistances[neighborNode]) {
            prevDistances[neighborNode] = newDistance;
            previousNodes[neighborNode] = node;
            nodeList.enqueue(neighborNode, newDistance);
          }
        }
      }
    }

    return [start, ...res.reverse()];
  }
}

const graph = new WeightedGraph()
graph.addVtx('A').addVtx('Z').addVtx('C').addVtx('D').addVtx('E').addVtx('H').addVtx('Q').addVtx('G');

graph.addEdge('A', 'Z', 7).addEdge('A', 'C', 8).addEdge('Z', 'Q', 2).addEdge('C', 'G', 4).addEdge('D', 'Q', 8).addEdge('E', 'H', 1).addEdge('H', 'Q', 3).addEdge('Q', 'C', 6).addEdge('G', 'Q', 9)

console.log(
  graph.dijkstra('A', 'E'),
  graph.dijkstra('A', 'D'),
)
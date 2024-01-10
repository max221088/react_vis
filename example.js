
// const graph = {
//         nodes: [
//             { id: 1,  title: 'Узел 1',shape: 'dot', size: 10},
//             { id: 2,  title: 'Узел 2', shape: 'dot', size: 10 },
//             { id: 3,  title: 'Узел 3', shape: 'dot', size: 10  },
//             { id: 4,  title: 'Узел 4', shape: 'dot', size: 10  },
//             { id: 5,  title: 'Узел 5', shape: 'dot', size: 10  },
//             { id: 6,  title: 'Узел 6', shape: 'dot', size: 10  },
//             { id: 7,  title: 'Узел 7', shape: 'dot', size: 10  },
//             { id: 8,  title: 'Узел 8', shape: 'dot', size: 10  },
//             { id: 9,  title: 'Узел 9', shape: 'dot', size: 10  },
//             { id: 10, title: 'Узел 10', shape: 'dot', size: 10  },
//         ],
//         edges: [
//             { from: 1, to: 2 },
//             { from: 1, to: 3 },
//             { from: 1, to: 4 },
//             { from: 5, to: 6 },
//             { from: 5, to: 7 },
//             { from: 5, to: 8 },
//             { from: 5, to: 9 },
//             { from: 5, to: 10 },
//         ],
//     };

const util = require('util');
const graph = require('./src/data/metadata.json');

function getConnectedComponents(graph) {
    const visited = new Set();
    const components = [];
  
    function dfs(nodeId, component) {
      visited.add(nodeId);
      component.push(nodeId);
  
      const neighbors = graph.edges
        .filter((edge) => edge.from === nodeId || edge.to === nodeId)
        .map((edge) => (edge.from === nodeId ? edge.to : edge.from));
  
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          dfs(neighbor, component);
        }
      }
    }
  
    for (const node of graph.nodes) {
      const nodeId = node.id;
      if (!visited.has(nodeId)) {
        const component = [];
        dfs(nodeId, component);
        components.push(component);
      }
    }
  
    return components;
  }

function findDuplicateEdges(edges) {
    const seenEdges = new Set();
    const duplicateEdges = [];
  
    for (const edge of edges) {
      const edgeString = JSON.stringify(edge);
  
      if (seenEdges.has(edgeString)) {
        duplicateEdges.push(edge);
      } else {
        seenEdges.add(edgeString);
      }
    }
  
    return duplicateEdges;
  }

  function findDuplicateEdgeIndexes(edges) {
    const seenEdges = new Map();
    const duplicateIndexes = [];
  
    edges.forEach((edge, index) => {
      const edgeString = JSON.stringify(edge);
  
      if (seenEdges.has(edgeString)) {
        const firstIndex = seenEdges.get(edgeString);
        duplicateIndexes.push([firstIndex, index]);
      } else {
        seenEdges.set(edgeString, index);
      }
    });
  
    return duplicateIndexes;
  }
  
  
  
  //   const connectedComponentsIndex = findDuplicateEdgeIndexes(graph.edges);
  //   console.log(connectedComponentsIndex);
  
  //   console.log(graph.edges[42]);
  //   console.log(graph.edges[48]);
  
  const result = getConnectedComponents(graph);
  console.log(graph.edges.length);
//   console.log(result)
//   console.log(result[0].edge.length + result[1].edge.length)
  
  const connectedComponents = findDuplicateEdges(result[1]);
//    console.log(connectedComponents);


//   const connectedGraphs = splitGraph(graph);
//   const res = addIdentifierToData(connectedGraphs)

// console.log(result);
      console.log(util.inspect(result, { showHidden: false, depth: null }));
      
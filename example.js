function splitGraph(graph) {
    const visited = new Set();
    const result = [];
  
    function dfs(node, currentGraph) {
      visited.add(node);
      currentGraph.nodes.push(graph.nodes.find(n => n.id === node));
      
      for (const edge of graph.edges) {
        if (edge.from === node && !visited.has(edge.to)) {
          currentGraph.edges.push(edge);
          dfs(edge.to, currentGraph);
        }
        if (edge.to === node && !visited.has(edge.from)) {
          currentGraph.edges.push(edge);
          dfs(edge.from, currentGraph);
        }
      }
    }
  
    for (const node of graph.nodes) {
      if (!visited.has(node.id)) {
        const currentGraph = { nodes: [], edges: [] };
        dfs(node.id, currentGraph);
        result.push(currentGraph);
      }
    }
  
    return result;
  }
  
  
  const exampleGraph = {
    nodes: [
        { id: 1,  title: 'Узел 1',shape: 'dot', size: 10},
        { id: 2,  title: 'Узел 2', shape: 'dot', size: 10 },
        { id: 3,  title: 'Узел 3', shape: 'dot', size: 10  },
        { id: 4,  title: 'Узел 4', shape: 'dot', size: 10  },
        { id: 5,  title: 'Узел 5', shape: 'dot', size: 10  },
        { id: 6,  title: 'Узел 6', shape: 'dot', size: 10  },
        { id: 7,  title: 'Узел 7', shape: 'dot', size: 10  },
        { id: 8,  title: 'Узел 8', shape: 'dot', size: 10  },
        { id: 9,  title: 'Узел 9', shape: 'dot', size: 10  },
        { id: 10, title: 'Узел 10', shape: 'dot', size: 10  },
    ],
    edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 1, to: 4 },
        { from: 5, to: 6 },
        { from: 5, to: 7 },
        { from: 5, to: 8 },
        { from: 5, to: 9 },
        { from: 5, to: 10 },
    ],
  };
  
  const resultGraphs = splitGraph(exampleGraph);
//   console.log(exampleGraph)
  console.log(resultGraphs[1]);
//   console.log(JSON.stringify(resultGraphs, null, 2));
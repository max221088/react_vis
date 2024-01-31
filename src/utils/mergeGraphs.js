export const mergeGraphs = (graphs) => {
  const mergedGraph = {
    edges: [],
    nodes: [],
  };

  graphs.forEach((graph) => {
    mergedGraph.nodes.push(...graph.nodes);

    mergedGraph.edges.push(...graph.edges);
  });
  return mergedGraph;
};

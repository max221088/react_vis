export const selectEdgesForCut = (graph1, graph2) => {
  const nodesInGraph2 = new Set(graph2.nodes.map((node) => node.id));

  const connectionsInGraph2 = graph1.edges.filter(
    (edge) => nodesInGraph2.has(edge.from) || nodesInGraph2.has(edge.to)
  );

  const uniqueConnectionIds = connectionsInGraph2
    .filter(
      (edge) =>
        !graph2.edges.some(
          (edge2) => edge.from === edge2.from && edge.to === edge2.to
        )
    )
    .map((edge) => edge.id);

  return uniqueConnectionIds;
};

export const selectGraphForCopy = (graph, event) => {
  let edgesForDelete = [];
  const selectEdgesFromGraph = graph.edges.filter((edge) => {
    if (event.edges.includes(edge.id.toString())) {
      if (
        edge.to.match(/^(.*?)-\$\$-/)[1] === "FILE" ||
        edge.to.match(/^(.*?)-\$\$-/)[1] === "TAG"
      ) {
        edgesForDelete.push(edge.id);
        return false;
      }
      return true;
    } else {
      return false;
    }
  });
  const allNodeIds = new Set();
  allNodeIds.add(event.nodes[0]);
  selectEdgesFromGraph.forEach((edge) => {
    allNodeIds.add(edge.from);
    allNodeIds.add(edge.to);
  });
  const selectNodesFromGraph = Object.values(graph.nodes).filter((node) =>
    allNodeIds.has(node.id)
  );
  const copyGraph = { nodes: {}, edges: [] };
  selectNodesFromGraph.forEach(
    () => (copyGraph.nodes = selectNodesFromGraph.map((node) => ({ ...node })))
  );
  selectEdgesFromGraph.forEach((edge) => copyGraph.edges.push({ ...edge }));
  copyGraph.idSelectedNode = event.nodes[0];
  // console.log(copyGraph);
  let graphID;
  if (copyGraph.nodes[0]) {
    graphID = copyGraph.nodes[0].parent;
  }
  return {
    copyGraph: copyGraph,
    edgesForDelete: edgesForDelete,
    graphID: graphID,
  };
};

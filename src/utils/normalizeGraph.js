export const normalizeGraph = (graphs) => {
  const stringData = JSON.stringify(graphs);
  const clonedGraphs = JSON.parse(stringData);
  for (let i = 0; i < clonedGraphs.length; i++) {
    clonedGraphs[i].nodes.forEach((node) => {
      if (node.id.match(/-\$\$-(.*)/)[1] != null) {
        node.id = node.id.match(/-\$\$-(.*)/)[1];
      }
    });
    clonedGraphs[i].edges.forEach((edge, index) => {
      if (edge.from.match(/-\$\$-(.*)/)[1] != null) {
        edge.from = edge.from.match(/-\$\$-(.*)/)[1];
      }
      if (edge.to.match(/-\$\$-(.*)/)[1] != null) {
        edge.to = edge.to.match(/-\$\$-(.*)/)[1];
      }
    });
  }

  return clonedGraphs;
};

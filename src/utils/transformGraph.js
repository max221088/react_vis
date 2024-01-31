const { v4: uuidv4 } = require("uuid");

export const transformGraph = (graphs) => {
  const stringData = JSON.stringify(graphs);
  const clonedGraphs = JSON.parse(stringData);
  clonedGraphs.forEach((graph) => {
    let keys = {};
    graph.nodes.forEach((node) => {
      keys[node.id] = node.type + "-$$-" + node.id;
      node.id = node.type + "-$$-" + node.id;
    });
    graph.edges.forEach((edge) => {
      edge.from = keys[edge.from];
      edge.to = keys[edge.to];
      if (!edge.id) {
        edge.id = uuidv4().toString();
      }
    });
  });
  return clonedGraphs;
};

const { v4: uuidv4 } = require("uuid");

export const vaultIdAdd = (graph) => {
  if (!/-v(\d+)/.test(graph[0].nodes[0].id.toString())) {
    graph.forEach((item, index) => {
      const identifier = `-v${(index + 1).toString().padStart(2, "0")}`;

      item.nodes.forEach((node) => {
        node.id = `${node.id}${identifier}`;
      });

      item.edges.forEach((edge) => {
        edge.from = `${edge.from}${identifier}`;
        edge.to = `${edge.to}${identifier}`;
        edge.id = uuidv4().toString();
      });
    });
    return graph;
  } else {
    return graph;
  }
};

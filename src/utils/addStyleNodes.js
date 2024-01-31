export const addSyleNodes = (graph) => {
  let i = 1;
  graph.nodes.forEach((node) => {
    if (node.type === "FILE") {
      node.shape = "circle";
      node.size = 15;
      node.color = { color: "#aaaab3ff", hover: "#8a5cecff" };
      node.label = i.toString();
      i++;
    }
    if (node.type === "TAG") {
      node.color.background = "#0078d4";
    }
  });
};

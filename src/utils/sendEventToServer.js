import { normalizeGraph } from "./normalizeGraph";
export const sendEventToServer = (metaData, marker, edges, copyGraph) => {
  let index;
  // console.log(metaData);
  if (marker === "add") {
    // console.log("add", metaData, marker, edges);
    for (let i = 0; i < metaData.length; i++) {
      metaData[i].nodes.forEach((node) => {
        if (node.id === edges.to) {
          index = i;
          metaData[i].edges.push(edges);
          if (copyGraph.nodes) {
            metaData[i].edges = [...metaData[i].edges, ...copyGraph.edges];
            metaData[i].nodes = [...metaData[i].nodes, ...copyGraph.nodes];
          }
        }
      });
    }
  }
  if (marker === "remove") {
    // console.log("remove", metaData, marker, edges);
    for (let i = 0; i < metaData.length; i++) {
      metaData[i].edges = metaData[i].edges.filter((edge) => {
        if (!edges.includes(edge.id)) {
          return true;
        } else {
          index = i;
          return false;
        }
      });
    }
  }

  function postRequest(method, data) {
    return fetch(`http://localhost:2323/${method}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    });
  }
  // console.log(metaData);
  const normalMetaData = normalizeGraph(metaData);
  // console.log(normalMetaData[0]);
  // console.log(index);
  postRequest("change/", normalMetaData[index]);
};

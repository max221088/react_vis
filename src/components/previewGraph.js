import React from "react";
import Graph from "react-graph-vis";

export default function PreviewGraph({ graph }) {
  const options = {
    interaction: {
      tooltipDelay: 300,
      hover: true,
    },
    locale: "ru",
    height: "100%",
    width: "100%",
    edges: {
      color: {
        color: "#424242ff",
        highlight: "#848484",
        hover: "#8153ecff",
        inherit: "from",
        opacity: 1.0,
      },
    },
    nodes: {
      color: "#999",
    },
  };
  console.log(graph);
  return (
    <div className="graph-container">
      {graph && <Graph graph={graph} options={options} />}
    </div>
  );
}

import React from "react";
import Graph from "react-graph-vis";

export default function PreviewGraph(props) {
  let graph = {
    nodes: [],
    edges: [],
  };

  if (props.data && props.data.nodes && props.data.edges) {
    graph = props.data;
    graph.edges = props.data.edges;
  }

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

  return (
    <div className="graph-container">
      <Graph graph={graph} options={options} />
    </div>
  );
}

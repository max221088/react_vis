import React from "react";
import PreviewGraph from "./previewGraph";

export default function VaultList({ graphs, setCurrentGraph }) {
  return (
    <div className="left-bar">
      <button
        className="show-all-btn"
        onClick={() => {
          setCurrentGraph(undefined);
        }}>
        Show All
      </button>
      {graphs.map((graph) => (
        <div
          key={graph.id}
          className="item-container"
          onClick={() => setCurrentGraph(graph.id)}>
          <PreviewGraph graph={graph} />
        </div>
      ))}
    </div>
  );
}

import React, { useMemo, useState } from "react";
import Graph from "react-graph-vis";
import { sendEventToServer } from "../utils/sendEventToServer";

const options = {
  interaction: {
    navigationButtons: true,
    tooltipDelay: 300,
    hover: true,
  },
  locale: "ru",
  height: "500",
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
  manipulation: {
    enabled: true,
    initiallyActive: true,
    addNode: true,
    addEdge: true,
    editEdge: true,
    deleteNode: true,
    deleteEdge: true,
    controlNodeStyle: {},
  },
};

export default function GraphView({
  graph,
  graphManager,
  setCopyVault,
  selectedNode,
  selectNode,
  addEdge,
  setextractTags,
  extractTags,
}) {
  const [movingMetadata, setMovingMetadata] = useState({
    distance: null,
    redundantEdges: [],
    nodeId: "",
  });
  const normalizedGraph = useMemo(() => {
    let fileIndex = 1;
    return {
      nodes: graph.nodes.map((node) => {
        const newNode = {
          id: node.id,
          title: node.title,
          type: node.type,
          hidden: node.hidden ? node.hidden : false,
          shape: "dot",
          size: 8,
          color: {
            background: "#424242ff",
            hover: "#8a5cecff",
            border: "#424242ff",
          },
          chosen: {
            node: function (values, id, selected, hovering) {
              values.color = "#8a5cecff";
            },
          },
        };

        if (node.type === "FILE") {
          newNode.shape = "circle";
          newNode.size = 15;
          newNode.color = { color: "#aaaab3ff", hover: "#8a5cecff" };
          newNode.label = fileIndex.toString();
          fileIndex++;
        }
        if (node.type === "TAG") {
          newNode.color.background = "#0078d4";
        }

        return newNode;
      }),
      edges: graph.edges.map((edge) => ({
        from: edge.from,
        to: edge.to,
        id: edge.id,
        fromNodeType: edge.fromNode.type,
        toNodeType: edge.toNode.type,
        arrows: {
          to: {
            enabled: false,
          },
          middle: {
            enabled: false,
          },
          from: {
            enabled: false,
          },
        },
        chosen: {
          edge: function (values, id, selected, hovering) {
            values.color = "#8a5cecff";
          },
        },
      })),
    };
  }, [graph]);

  const events = {
    select: function (event) {
      const nodeId = event.nodes[0];
      if (!nodeId) {
        return;
      }

      const ctrlPressed = event.event.srcEvent.ctrlKey;
      const node = graphManager.getNode(nodeId);
      const nodeValid = node.type === "FILE" || node.type === "TAG";

      if (!ctrlPressed && nodeValid) {
        selectNode(nodeId);
      }

      if (
        ctrlPressed &&
        selectedNode?.type === "FILE" &&
        nodeId !== selectedNode.id &&
        nodeValid
      ) {
        addEdge(selectedNode, nodeId);
      }
    },
    doubleClick: function (event) {
      if (!event.nodes?.[0]) {
        return;
      }

      setCopyVault(event.nodes[0], event.edges);
    },
    dragStart: function (event) {
      const targetNodeId = event.nodes[0];
      if (!targetNodeId || !event.event.srcEvent.ctrlKey) {
        return;
      }

      const node = graphManager.getNode(targetNodeId);
      if (node.type !== "FILE") {
        return;
      }
      const copiedGraph = graphManager.getCopiedVault(
        event.nodes[0],
        event.edges
      );
      setMovingMetadata({
        action: true,
        redundantEdges: copiedGraph.redundantEdges,
        nodeId: targetNodeId,
        distance: event.event.distance,
      });
    },
    dragging: function (event) {
      let distance = Math.abs(event.event.distance - movingMetadata.distance);

      if (
        event.event.srcEvent.ctrlKey === true &&
        distance > 70 &&
        movingMetadata.redundantEdges.length > 0 &&
        movingMetadata.action
      ) {
        const newGraph = {
          edges: graph.edges
            .filter(
              (edge) =>
                !movingMetadata.redundantEdges.includes(edge.original.id)
            )
            .map((edge) => edge.original),
          nodes: graph.nodes.map((node) => node.original),
          vault: graph.vaultMetadata.vault,
        };
        movingMetadata.action = false;

        // send event to server without redundant edges
        sendEventToServer("change/", newGraph);

        setMovingMetadata({
          redundantEdges: [],
          nodeId: movingMetadata.nodeId,
          distance: movingMetadata.distance,
        });
      }
    },
  };
  return (
    <div className="container">
      <div className="dashboard">
        <input
          type="checkbox"
          checked={extractTags}
          onChange={() => {
            setextractTags(!extractTags);
          }}
        />
        <label>Show Tag</label>
      </div>
      {normalizedGraph && (
        <Graph graph={normalizedGraph} options={options} events={events} />
      )}
    </div>
  );
}

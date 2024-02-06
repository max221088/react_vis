import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import GraphView from "./components/graph.js";
import PreviewGraph from "./components/previewGraph.js";
import VaultList from "./components/VaultList.js";
import { Centrifuge } from "centrifuge";
import { fetchData } from "./utils/fetchData";
import { sendEventToServer } from "./utils/sendEventToServer.js";
import { useGraphManager } from "./graphManager/useGraphManager";

import "./App.css";

const centrifuge = new Centrifuge("ws://localhost:2324/connection/websocket");
centrifuge.connect();
const sub = centrifuge.newSubscription("channel");

function App() {
  const [currentGraph, setCurrentGraph] = useState();
  const [originalGraph, setOriginalGraph] = useState();
  const [copiedVault, setCopiedVault] = useState();
  const [extractTags, setextractTags] = useState(true);

  const {
    graphManager,
    graph,
    graphArray,
    selectNode,
    selectedNode,
    filteredGraph,
  } = useGraphManager({
    data: originalGraph,
    currentGraph,
    extractTags,
  });
  const updateMetadata = useCallback(() => {
    fetchData()
      .then((data) => {
        if (!data) {
          return;
        }
        setOriginalGraph(data);
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    sub
      .on("publication", function (ctx) {
        updateMetadata();
      })
      .subscribe();

    updateMetadata();
  }, []);

  const copyVault = useCallback(
    (targetId, relatedEdgeIds) => {
      const res = graphManager.getCopiedVault(targetId, relatedEdgeIds);
      setCopiedVault(res);
    },
    [graphManager]
  );

  const onNodeSelect = useCallback(
    (selectedNodeId) => {
      if (copiedVault && copiedVault.id !== currentGraph && currentGraph) {
        let newEdge = {
          from: copiedVault.targetNode.id,
          to: selectedNodeId,
          id: uuidv4().toString(),
        };
        let newGraph = {
          nodes: [
            ...copiedVault.nodes.map((node) => node.original),
            ...graph.nodes.map((node) => node.original),
          ],
          edges: [
            ...copiedVault.edges.map((edge) => edge.original),
            ...graph.edges.map((edge) => edge.original),
            newEdge,
          ],
          vault: graph.vaultMetadata.vault,
        };

        // send to server merged graph
        sendEventToServer("change/", newGraph);
        setCopiedVault(undefined);
      }

      selectNode(selectedNodeId);
    },
    [copiedVault, selectNode, currentGraph, graph]
  );

  const addEdge = useCallback(
    (selectedNode, toId) => {
      // check if they from same vault
      if (
        graphManager.getNode(toId).parent ===
        graphManager.getNode(selectedNode.id).parent
      ) {
        const newEdge = {
          from: selectedNode.id,
          to: toId,
          id: uuidv4().toString(),
        };
        const graphFromID = graphManager.getGraph(selectedNode.parent);
        const newGraph = {
          nodes: [...graphFromID.nodes.map((node) => node.original)],
          edges: [...graphFromID.edges.map((edge) => edge.original), newEdge],
          vault: graphFromID.vaultMetadata.vault,
        };
        // send to server graph
        sendEventToServer("change/", newGraph);
      }
    },
    [copiedVault, selectNode]
  );
  return (
    <div className="App">
      <GraphView
        graph={filteredGraph}
        setCopyVault={copyVault}
        graphManager={graphManager}
        selectNode={onNodeSelect}
        selectedNode={selectedNode}
        addEdge={addEdge}
        extractTags={extractTags}
        setextractTags={setextractTags}
      />
      <div className="buffer-container">
        {copiedVault && <PreviewGraph graph={copiedVault} />}
      </div>
      {graphArray.length > 0 && (
        <VaultList graphs={graphArray} setCurrentGraph={setCurrentGraph} />
      )}
    </div>
  );
}

export default App;

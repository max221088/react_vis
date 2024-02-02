import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import GraphView from "./components/graph.js";
import PreviewGraph from "./components/previewGraph.js";
import VaultList from "./components/VaultList.js";
import { Centrifuge } from "centrifuge";
import { fetchData } from "./utils/fetchData";
import { useGraphManager } from "./graphManager/useGraphManager";

import "./App.css";

const centrifuge = new Centrifuge("ws://localhost:2324/connection/websocket");
centrifuge.connect();
const sub = centrifuge.newSubscription("channel");

function App() {
    const [currentGraph, setCurrentGraph] = useState();
    const [originalGraph, setOriginalGraph] = useState();
    const [copiedVault, setCopiedVault] = useState();
    const [loading, setLoading] = useState(true);

    const { graphManager, graph, graphArray, selectNode, selectedNode } = useGraphManager({
        data: originalGraph,
        currentGraph
    });

    const updateMetadata = useCallback(() => {
        setLoading(true);

        fetchData()
            .then(data => {
                if (!data) {
                    return;
                }
                setOriginalGraph(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        sub
            .on("publication", function (ctx) {
                updateMetadata();
            })
            .subscribe();

        updateMetadata();
    }, []);

    const copyVault = useCallback((targetId, relatedEdgeIds) => {
        const res = graphManager.getCopiedVault(targetId, relatedEdgeIds);
        setCopiedVault(res);
    }, [graphManager]);

    const onNodeSelect = useCallback((selectedNodeId) => {
        if (copiedVault && selectedNodeId !== copiedVault.targetNode.id) {
            // send to server merged graph
            // sendEventToServer(metaData, marker, edges, copyGraph);
        }

        selectNode(selectedNodeId);
    }, [copiedVault, selectNode]);

    const addEdge = useCallback((fromId, toId) => {
        // check if they from same vault
        let newEdge = {
            from: fromId,
            to: toId,
            id: uuidv4().toString(),
        };

        // send to server
    }, [copiedVault, selectNode]);

    return (
        <div className="App">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <GraphView
                    graph={graph}
                    setCopyVault={copyVault}
                    graphManager={graphManager}
                    selectNode={onNodeSelect}
                    selectedNode={selectedNode}
                    addEdge={addEdge}
                />
            )}
            <div className="buffer-container">
                {copiedVault && <PreviewGraph graph={copiedVault}/>}
            </div>
            {graphArray.length > 0 && (
                <VaultList
                    graphs={graphArray}
                    setCurrentGraph={setCurrentGraph}
                />
            )}
        </div>
    );
}

export default App;

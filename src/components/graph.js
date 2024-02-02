import React, { useMemo, useState } from "react";
import Graph from "react-graph-vis";

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

export default function GraphView({ graph, graphManager, setCopyVault, selectedNode, selectNode, addEdge }) {
    const [movingMetadata, setMovingMetadata] = useState({
        distance: null,
        redundantEdges: [],
        nodeId: "",
    });

    const normalizedGraph = useMemo(() => {
        let fileIndex = 0;
        return {
            nodes: graph.nodes.map((node) => {
                const newNode = {
                    id: node.id,
                    title: node.name,
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
                }

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
                addEdge(selectedNode.id, nodeId);
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

            const copiedGraph = graphManager.getCopiedVault(targetNodeId, event.edges);
            setMovingMetadata({
                redundantEdges: copiedGraph.redundantEdgesMap,
                nodeId: targetNodeId,
                distance: event.event.distance
            });
        },
        dragging: function (event) {
            let distance = event.event.distance - movingMetadata.distance;
            if (event.event.srcEvent.ctrlKey === true && distance > 70 && movingMetadata.redundantEdges.length > 0) {
                // const newGraph = cutEdges(normalizedGraph, edgesForDelete);
                // props.sendEvent("remove", edgesForDelete);
                // props.updateViewGraph(newGraph);

                // send event to server without redundant edges

                setMovingMetadata({
                    redundantEdges: [],
                    nodeId: movingMetadata.nodeId,
                    distance: movingMetadata.distance
                });
            }
        },
    };

    return (
        <div className="container">
            {normalizedGraph && (
                <Graph graph={normalizedGraph} options={options} events={events}/>
            )}
        </div>
    );
}

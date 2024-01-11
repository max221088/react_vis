export const cutEdges = (graph, edgeIdsToRemove) => {
    const modifiedGraph = {
        nodes: [...graph.nodes],
        edges: graph.edges.filter(edge => !edgeIdsToRemove.includes(edge.id)),
    };

    return modifiedGraph;
}
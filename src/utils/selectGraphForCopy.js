export const selectGraphForCopy = (graph, event) =>{
    const selectEdgesFromGraph = graph.edges.filter((edge) => event.edges.includes(edge.id));
    const allNodeIds = new Set();
    selectEdgesFromGraph.forEach((edge) => {
        allNodeIds.add(edge.from);
        allNodeIds.add(edge.to);
    });
    const selectNodesFromGraph = Object.values(graph.nodes).filter((node) => allNodeIds.has(node.id));
    const copyGraph = { nodes: {}, edges: [] };
    selectNodesFromGraph.forEach(() => copyGraph.nodes = selectNodesFromGraph.map((node) => ({ ...node })));
    selectEdgesFromGraph.forEach((edge) => copyGraph.edges.push({ ...edge }));
    copyGraph.idSelectedNode = event.nodes[0]
    return copyGraph
}
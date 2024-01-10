export const splitGraph = (graph) => {
    const visited = new Set();
    const result = [];
        
    function dfs(node, currentGraph) {
        visited.add(node);
        currentGraph.nodes.push(graph.nodes.find(n => n.id === node));

        for (const edge of graph.edges) {
            if (edge.from === node && !visited.has(edge.to)) {
                currentGraph.edges.push(edge);
                dfs(edge.to, currentGraph);
            }
            if (edge.to === node && !visited.has(edge.from)) {
                currentGraph.edges.push(edge);
                dfs(edge.from, currentGraph);
            }
        }
    }
    
    for (const node of graph.nodes) {
        if (!visited.has(node.id)) {
            const currentGraph = { nodes: [], edges: [] };
            dfs(node.id, currentGraph);
            result.push(currentGraph);
        }
    }
    return result
}
import { prop } from "lodash/fp";
import React from "react";
import Buffer from "./buffer";

export default function VaultList (props) {

    const graph = props.data;

    function splitGraph(graph) {

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
        
        let res = result;

        if (!(/-v(\d+)/.test(res[0].nodes[0].id.toString()))) {

        res.forEach((item, index) => {
            const identifier = `-v${(index + 1).toString().padStart(2, '0')}`;
            
            item.nodes.forEach(node => {
                node.id = `${node.id}${identifier}`;
            });
        
            item.edges.forEach(edge => {
                edge.from = `${edge.from}${identifier}`;
                edge.to = `${edge.to}${identifier}`;
            });
            });
            return result;

        } else {    

            return res
        }
    }
    

    const graphData = splitGraph(graph);
    
    function changeGraph (graph) {
        props.updateViewGraph(graph);
    }

    return (
        <div className="left-bar">
            {graphData.map((graph, index) => (
                <div key={index} className="item-container" onClick={() => changeGraph(graph)}>
                    <Buffer data={graph} />
                </div>
            ))}
        </div>
    )
}
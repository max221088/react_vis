import React from "react";
import Graph from "react-graph-vis";


export default function GraphView (props) {
    // const graph = {
    //     nodes: [
    //         { id: 1,  title: 'Узел 1',shape: 'dot', size: 10},
    //         { id: 2,  title: 'Узел 2', shape: 'dot', size: 10 },
    //         { id: 3,  title: 'Узел 3', shape: 'dot', size: 10  },
    //         { id: 4,  title: 'Узел 4', shape: 'dot', size: 10  },
    //         { id: 5,  title: 'Узел 5', shape: 'dot', size: 10  },
    //         { id: 6,  title: 'Узел 6', shape: 'dot', size: 10  },
    //         { id: 7,  title: 'Узел 7', shape: 'dot', size: 10  },
    //         { id: 8,  title: 'Узел 8', shape: 'dot', size: 10  },
    //         { id: 9,  title: 'Узел 9', shape: 'dot', size: 10  },
    //         { id: 10, title: 'Узел 10', shape: 'dot', size: 10  },
    //     ],
    //     edges: [
    //         { from: 1, to: 2 },
    //         { from: 1, to: 3 },
    //         { from: 1, to: 4 },
    //         { from: 1, to: 5 },
    //         { from: 5, to: 6 },
    //         { from: 5, to: 7 },
    //         { from: 5, to: 8 },
    //         { from: 5, to: 9 },
    //         { from: 5, to: 10 },
    //     ],
    // };
    const data = require('../data/metadata.json');
    const graph = {
        nodes: data.nodes.map(node => ({
            id: node.id,
            title: node.name, 
            shape: 'dot',
            size: 8,
            color: {background:'#424242ff', hover:'#8a5cecff', border: '#424242ff' },
            chosen: {
                node: function(values, id, selected, hovering) {
                    values.color = '#8a5cecff';
                    // console.log(id)
                    // console.log(selected)
                    // console.log( hovering)
                  }
            }
        })),
        edges: data.edges.map(node => ({
            from: node.from,
            to: node.to, 
            arrows: {
                to: {
                enabled: false,
                },
                middle: {
                enabled: false,
                },
                from: {
                enabled: false,
                }
            },
            chosen: {
                edge: function(values, id, selected, hovering) {
                    values.color = '#8a5cecff';
                    // console.log(id)
                    // console.log(selected)
                    // console.log( hovering)
                  }
            }
        })),
    };

    function addStyleToNodesWithMoreThan3Edges(graph) {
        let i = 1;
        graph.nodes.forEach((node) => {
            const edgesCount = graph.edges.filter((edge) => edge.from === node.id || edge.to === node.id).length;
            if (edgesCount > 3) {
                node.shape = 'circle';
                node.size = 15;
                node.color = {color: '#aaaab3ff', hover:'#8a5cecff'};
                node.label = i.toString();
                i++;
            }
        });
    }
    
    addStyleToNodesWithMoreThan3Edges(graph);

    const options = {
        interaction: {
            navigationButtons: true,
            tooltipDelay: 300,
            hover: true,
        },
        locale: 'ru',
        height : '500' , 
        width : '100%',
        edges: {
            color: {
                color:'#424242ff',
                highlight:'#848484',
                hover: '#8153ecff',
                inherit: 'from',
                opacity:1.0
              },
            // color: '#555',
            
        },
        nodes: {
            color: '#999',
        },
        manipulation: {
            enabled: true,
            initiallyActive: true,
            addNode: true,
            addEdge: true,
            editNode: function(nodeData,callback) {
                nodeData.label = 'hello world';
                callback(nodeData);
              },
            editEdge: true,
            deleteNode: true,
            deleteEdge: true,
            controlNodeStyle:{
            }
        },
    };


    const events = {
        // select: function(event) {
        //   var { nodes, edges, pointer } = event;
        //   console.log(nodes , edges, pointer)
        //   console.log(event)
        //   console.log(graph.nodes[nodes-1])
        // },
        doubleClick: function(event) {
            const selectEdgesFromGraph = graph.edges.filter((edge) => event.edges.includes(edge.id));
            const allNodeIds = new Set();
            selectEdgesFromGraph.forEach((edge) => {
                  allNodeIds.add(edge.from);
                  allNodeIds.add(edge.to);
                });
            const selectNodesFromGraph = Object.values(graph.nodes).filter((node) => allNodeIds.has(node.id));
            const newGraph = { nodes: {}, edges: [] };
            selectNodesFromGraph.forEach(() => newGraph.nodes = selectNodesFromGraph.map((node) => ({ ...node })));
            selectEdgesFromGraph.forEach((edge) => newGraph.edges.push({ ...edge }));
            // console.log(newGraph)
            props.updateGraphData(newGraph);
        }
    };
    
    return (
        <div className="container">
            <Graph 
                graph={graph}
                options={options}
                events={events}
            />
        </div>
    )
}
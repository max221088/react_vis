import { prop } from "lodash/fp";
import React from "react";
import Graph from "react-graph-vis";
import { cutEdges } from "../utils/cutEdges";
import { selectEdgesForCut } from "../utils/selectEdgesForCut";
import { selectGraphForCopy } from "../utils/selectGraphForCopy";
const { v4: uuidv4 } = require('uuid');


export default function GraphView (props) {
    let move = {
        action: false,
        distance: null,
        edges: [],
        nodeId : ''
    };
    let edgesForDelete = [];
    let selectedNode = false;
    const data = props.data;
    let graph = {
        nodes: data.nodes.map(node => ({
            id: node.id,
            title: node.name, 
            shape: 'dot',
            size: 8,
            color: {background:'#424242ff', hover:'#8a5cecff', border: '#424242ff' },
            chosen: {
                node: function(values, id, selected, hovering) {
                    values.color = '#8a5cecff';
                  }
            }
        })),
        edges: data.edges.map(edge => ({
            from: edge.from,
            to: edge.to, 
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
        select: function(event) {
                if (event.event.srcEvent.ctrlKey === false) {
                    selectedNode = event.nodes[0];
                }
            if (props.copyGraph.nodes && event.event.srcEvent.ctrlKey === false) {
                let newEdge = { from: props.copyGraph.idSelectedNode, to: event.nodes[0], id: uuidv4().toString() }
                graph.edges.push(newEdge)
                props.copyGraph.nodes.forEach((el) => {
                    if (!graph.nodes.some(node => node.id === el.id)) {
                        graph.nodes.push(el);
                    }
                })
                props.copyGraph.edges.forEach((el) => {
                    if (!graph.edges.some(node => node.id === el.id)) {
                        graph.edges.push(el)
                    }
                })
                props.sendEvent('add', newEdge)
                props.updateViewGraph(graph);
                props.updateCopyGraph({});

            }
            if (event.event.srcEvent.ctrlKey === true && selectedNode && event.nodes !== selectedNode && event.nodes[0]) {
                let newEdge = { from: selectedNode.toString(), to: event.nodes[0].toString(), id: uuidv4().toString() };
                graph.edges.push(newEdge);
                props.sendEvent('add', newEdge);
                props.updateViewGraph(graph);
                selectedNode = false
            }
        },
        doubleClick: function(event) {
            const copyGraph = selectGraphForCopy(graph, event)
            props.updateCopyGraph(copyGraph);
        },
        selectNode: function (event) {
            if (event.event.srcEvent.ctrlKey === true){
                
                // console.log(graph)
                // console.log(event.nodes[0] )
                // console.log(newGraph)
            }
        },
        dragStart: function (event) {
            if (event.event.srcEvent.ctrlKey === true && event.nodes[0]){
                const copyGraph = selectGraphForCopy(graph, event)
                edgesForDelete = selectEdgesForCut(graph, copyGraph)
                move.action = true
                move.edges = event.edges
                move.distance = event.event.distance
                move.nodeId = event.nodes
            }
        },
        dragging: function (event) {
            if (event.event.srcEvent.ctrlKey === true){
                let distance = event.event.distance - move.distance;
                if (distance > 70 && move.action) {
                    const newGraph = cutEdges(graph, edgesForDelete);
                    props.sendEvent('remove', edgesForDelete)
                    props.updateViewGraph(newGraph);
                    move.action = false
                }
            }
        }
    };
    // console.log(graph)
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
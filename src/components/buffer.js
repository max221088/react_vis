import React from "react";
import Graph from "react-graph-vis";

export default function Buffer (props) {

    let graph = {
        nodes: [],
        edges: [],
      };

    if (props.data && props.data.nodes && props.data.edges) {
        graph = props.data;
        graph.edges = props.data.edges;
    }

    console.log(graph)

    // const graph = {
    //         nodes: [
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
    // }

    const options = {
        interaction: {
            tooltipDelay: 300,
            hover: true,
        },
        locale: 'ru',
        height : '100%' , 
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
    };

    const events = {}

    return (
        <div className="graph-container">
            <Graph 
                graph={graph}
                options={options}
                events={events}
            />
        </div>
    )
}
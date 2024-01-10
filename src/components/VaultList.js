import { prop } from "lodash/fp";
import React from "react";
import PreviewGraph from "./previewGraph";
import { mergeGraphs } from "../utils/mergeGraphs";

export default function VaultList (props) {

    const graph = props.data;
    function changeGraph (graph) {
        props.updateViewGraph(graph);
    }

    function showAll (graph) {
        const all = mergeGraphs(graph)
        props.updateViewGraph(all);
    }

    return (
        <div className="left-bar">
            <button className="show-all-btn" onClick={() =>{showAll(graph)}}>Show All</button>
            {graph.map((graph, index) => (
                <div key={index} className="item-container" onClick={() => changeGraph(graph)}>
                    <PreviewGraph data={graph} />
                </div>
            ))}
        </div>
    )
}
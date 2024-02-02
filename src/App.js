import "./App.css";
import React, { useState, useEffect } from "react";
import GraphView from "./components/graph.js";
import PreviewGraph from "./components/previewGraph.js";
import VaultList from "./components/VaultList.js";
// import { splitGraph } from './utils/splitGraph.js';
// import { vaultIdAdd } from './utils/vaultIdAdd.js';
import { mergeGraphs } from "./utils/mergeGraphs.js";
import { sendEventToServer } from "./utils/sendEventToServer.js";
import { Centrifuge } from "centrifuge";
import { transformGraph } from "./utils/transformGraph.js";

const centrifuge = new Centrifuge("ws://localhost:2324/connection/websocket");
centrifuge.connect();
const sub = centrifuge.newSubscription("channel");

function App() {
  useEffect(() => {
    sub
      .on("publication", function (ctx) {
        // console.log("notification", ctx);
        fetchData();
        // setMetaData(transformGraph(ctx.data.newMetadata));
        // console.log(ctx.data.newMetadata);
        // setMetaData(transformGraph(ctx.data.newMetadata));
        // console.log(JSON.stringify(ctx.data.newMetadata, null, 2));
      })
      .on("subscribed", function (ctx) {
        // console.log("subscribed", ctx);
      })
      .subscribe();
  }, []);

  const [metaData, setMetaData] = useState({});
  const [loading, setLoading] = useState(true);

  function fetchData(all) {
    fetch("http://localhost:2323", { method: "GET" })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const res = await response.json();
        console.log(res);
        setMetaData(transformGraph(res));
        if (all) {
          updateViewGraph(mergeGraphs(transformGraph(res)));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  useEffect(() => {
    fetchData(false);
  }, []);

  const [copyGraph, setCopyGraph] = useState({});
  const [viewGraph, setViewGraph] = useState({
    nodes: [],
    edges: [],
  });

  const updateViewGraph = (newGraph) => {
    setViewGraph(newGraph);
  };

  const updateCopyGraph = (newData) => {
    setCopyGraph(newData);
  };

  const sendEvent = (marker, edges) => {
    // const mergedMeta = mergeGraphs(metaData)
    // const newMetadata =
    sendEventToServer(metaData, marker, edges, copyGraph);
    // console.log(newMetadata);
  };

  const showAll = () => {
    fetchData("All");
  };

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <GraphView
          data={viewGraph}
          updateCopyGraph={updateCopyGraph}
          copyGraph={copyGraph}
          updateViewGraph={updateViewGraph}
          sendEvent={sendEvent}
        />
      )}
      <div className="buffer-container">
        {Object.keys(copyGraph).length > 0 && <PreviewGraph data={copyGraph} />}
      </div>
      {Object.keys(metaData).length > 0 && (
        <VaultList
          data={metaData}
          updateViewGraph={updateViewGraph}
          showAll={showAll}
        />
      )}
    </div>
  );
}

export default App;

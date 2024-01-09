
import './App.css';
import React, { useState } from 'react';
import GraphView from './components/graph.js';
import Buffer from './components/buffer.js';
import VaultList from './components/VaultList.js';


function App() {

  const [graphData, setGraphData] = useState({});
  const [metaData, setMetaData] = useState(require('./data/metadata.json'));
  const [viewGraph, setViewGraph] = useState(metaData);

  const updateViewGraph = (newGraph) => {
    setViewGraph(newGraph)
  }

  const updateGraphData = (newData) => {
    setGraphData(newData)
  };

  return (
    <div className="App">
      <GraphView data={viewGraph} updateGraphData={updateGraphData} />
      {Object.keys(graphData).length > 0 && 
      <div className='buffer-container'>
        <Buffer data={graphData} />
      </div>}
      <VaultList data={metaData} updateViewGraph={updateViewGraph} />
    </div>
  );
}

export default App;

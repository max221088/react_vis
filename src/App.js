
import './App.css';
import React, { useState } from 'react';
import GraphView from './components/graph.js';
import Buffer from './components/buffer.js';
import VaultList from './components/VaultList.js';


function App() {

  const [metaData, setMetaData] = useState(require('./data/metadata.json'));
  const [copyGraph, setCopyGraph] = useState({});
  const [viewGraph, setViewGraph] = useState(metaData);

  const updateViewGraph = (newGraph) => {
    setViewGraph(newGraph)
  }

  const updateCopyGraph = (newData) => {
    setCopyGraph(newData)
  };

  return (
    <div className="App">
      <GraphView data={viewGraph} updateCopyGraph={updateCopyGraph} />
      <div className='buffer-container'>
      {Object.keys(copyGraph).length > 0 && 
        <Buffer data={copyGraph} />}
      </div>
      <VaultList data={metaData} updateViewGraph={updateViewGraph} />
    </div>
  );
}

export default App;

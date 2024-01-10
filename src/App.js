
import './App.css';
import React, { useState } from 'react';
import GraphView from './components/graph.js';
import PreviewGraph from './components/previewGraph.js';
import VaultList from './components/VaultList.js';
import { splitGraph } from './utils/splitGraph.js';
import { vaultIdAdd } from './utils/vaultIdAdd.js';
import { mergeGraphs } from './utils/mergeGraphs.js';


function App() {
  
  const [metaData, setMetaData] = useState(
    vaultIdAdd(splitGraph(require('./data/metadata.json')))
    );
  
  const [copyGraph, setCopyGraph] = useState({});
  const [viewGraph, setViewGraph] = useState(mergeGraphs(metaData));

  const updateViewGraph = (newGraph) => {
    // console.log(newGraph)
    setViewGraph(newGraph)
  }

  const updateCopyGraph = (newData) => {
    setCopyGraph(newData)
  };

  return (
    <div className="App">
      <GraphView 
        data={viewGraph} 
        updateCopyGraph={updateCopyGraph} 
        copyGraph={copyGraph} 
        updateViewGraph={updateViewGraph}
      />
      <div className='buffer-container'>
      {Object.keys(copyGraph).length > 0 && <PreviewGraph data={copyGraph} />}
      </div>
      <VaultList data={metaData} updateViewGraph={updateViewGraph} />
    </div>
  );
}

export default App;

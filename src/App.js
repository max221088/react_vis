
import './App.css';
import React, { useState } from 'react';
import GraphView from './components/graph.js';
import Buffer from './components/buffer.js';


function App() {

  const [graphData, setGraphData] = useState({});

  const updateGraphData = (newData) => {
    setGraphData(newData)
  };

  return (
    <div className="App">
      <GraphView updateGraphData={updateGraphData} />
      {Object.keys(graphData).length > 0 && <Buffer data={graphData} />}
    </div>
  );
}

export default App;

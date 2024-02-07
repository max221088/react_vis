import { GraphManager } from "./index";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useGraphManager({ data, currentGraph, extractTags }) {
  const [key, setKey] = useState(0);
  const [graphManager, setGraphManager] = useState(new GraphManager());

  useEffect(() => {
    if (data) {
      const newGraphManager = new GraphManager();
      newGraphManager.updateGraph(data);
      setGraphManager(newGraphManager);
    }
  }, [data]);

  const graph = useMemo(() => {
    return graphManager.getGraph(currentGraph);
  }, [currentGraph, graphManager]);

  const filteredGraph = useMemo(() => {
    if (extractTags) {
      return graph;
    } else {
      return {
        nodes: graph.nodes.map((node) =>
          node.type === "ANCHOR"
            ? { ...node, hidden: true }
            : { ...node, hidden: false }
        ),
        edges: graph.edges,
        vaultMetadata: graph.vaultMetadata,
      };
    }
  }, [graph, extractTags]);

  const vaultIds = useMemo(() => {
    return graphManager.getVaultIds();
  }, [graphManager]);

  const graphArray = useMemo(() => {
    return graphManager.getGraphArray();
  }, [graphManager]);

  const selectNode = useCallback(
    (targetId) => {
      graphManager.selectNode(targetId);
      setKey((key) => key + 1);
    },
    [graphManager]
  );

  return {
    graphManager,
    graph,
    filteredGraph,
    vaultIds,
    graphArray,
    selectNode,
    selectedNode: graphManager.selectedNode,
  };
}

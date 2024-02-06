const { v4: uuidv4 } = require("uuid");

export class GraphManager {
  vaults = [];
  selectedNode;

  updateGraph(graphs) {
    graphs.forEach(({ nodes, edges, ...rest }) => {
      const vault = {
        nodesMap: new Map(),
        edgesMap: new Map(),
        id: rest.vault.id,
        vaultMetadata: rest,
      };

      nodes.forEach((node) => {
        const newNode = {
          id: node.id,
          title: node.name,
          type: node.type,
          parent: node.parent || rest.vault.id,
          original: node,
        };

        vault.nodesMap.set(newNode.id, newNode);
      });
      edges.forEach((edge, index) => {
        const fromNode = vault.nodesMap.get(edge.from);
        const toNode = vault.nodesMap.get(edge.to);
        const id = uuidv4();
        const newEdge = {
          id: id,
          parent: rest.vault.id,
          from: edge.from,
          to: edge.to,
          fromNode,
          toNode,
          original: { ...edge, id: id },
        };

        vault.edgesMap.set(newEdge.id, newEdge);
      });

      this.vaults[rest.vault.id] = vault;
    });
  }

  getEdge(id) {
    for (let vault of Object.values(this.vaults)) {
      if (vault.edgesMap.has(id)) {
        return vault.edgesMap.get(id);
      }
    }
  }

  getNode(id) {
    for (let vault of Object.values(this.vaults)) {
      if (vault.nodesMap.has(id)) {
        return vault.nodesMap.get(id);
      }
    }
  }

  normalizeGraph(graphs) {
    const newGraph = [];
    graphs.forEach((graph) => {
      newGraph.push({
        nodes: Array.from(graph.nodesMap.values()),
        edges: Array.from(graph.edgesMap.values()),
        id: graph.id,
        vaultMetadata: graph.vaultMetadata,
      });
    });
    return newGraph;
  }

  getGraph(id) {
    const res = {
      edges: [],
      nodes: [],
    };
    if (id && this.vaults[id]) {
      res.vaultMetadata = this.vaults[id].vaultMetadata;
      res.edges.push(...Array.from(this.vaults[id].edgesMap.values()));
      res.nodes.push(...Array.from(this.vaults[id].nodesMap.values()));
    } else {
      for (let vault of Object.values(this.vaults)) {
        res.edges.push(...Array.from(vault.edgesMap.values()));
        res.nodes.push(...Array.from(vault.nodesMap.values()));
      }
    }

    return res;
  }

  getGraphArray() {
    return this.normalizeGraph(Object.values(this.vaults));
  }

  getGraphMap() {
    return Object.values(this.vaults);
  }

  getVaultIds() {
    return Object.keys(this.vaults);
  }

  getCopiedVault(targetId, edgeIds) {
    const vault = this.getGraphMap().find((it) => it.nodesMap.has(targetId));
    if (!vault) {
      return;
    }
    const targetNode = vault.nodesMap.get(targetId);
    if (targetNode.type !== "FILE") {
      return;
    }

    const edgesForDelete = [];
    const selectedEdgesMap = new Map();
    const selectedNodesMap = new Map();

    for (let edgeId of edgeIds) {
      const edge = this.getEdge(edgeId);

      if (
        (edge.from === targetId && edge.toNode.type === "FILE") ||
        (edge.to === targetId && edge.fromNode.type === "FILE") ||
        edge.toNode.type === "TAG"
      ) {
        edgesForDelete.push(edge.id);
      } else {
        let id = uuidv4().toString();
        edge.id = id;
        selectedEdgesMap.set(edge.id, edge);
        selectedNodesMap.set(edge.toNode.id, edge.toNode);
        selectedNodesMap.set(edge.fromNode.id, edge.fromNode);
      }
    }
    return {
      id: vault.id,
      targetNode,
      nodes: Array.from(selectedNodesMap.values()),
      edges: Array.from(selectedEdgesMap.values()),
      redundantEdges: edgesForDelete,
    };
  }

  selectNode(id) {
    this.selectedNode = this.getNode(id);
  }
}

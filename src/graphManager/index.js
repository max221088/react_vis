const { v4: uuidv4 } = require("uuid");

export class GraphManager {
    vaults = {};
    selectedNode;

    updateGraph(graphs) {
        graphs.forEach(graph => {
            const vault = {
                nodesMap: new Map(),
                edgesMap: new Map(),
                id: graph.vault.id,
                vaultMetadata: graph.vault
            };

            graph.nodes.forEach((node) => {
                const newNode = {
                    id: node.id,
                    title: node.name,
                    type: node.type,
                    parent: node.parent || graph.vault.id,
                    original: node
                }

                vault.nodesMap.set(newNode.id, newNode);
            });
            graph.edges.forEach((edge, index) => {
                const fromNode = vault.nodesMap.get(edge.from);
                const toNode = vault.nodesMap.get(edge.to);

                const newEdge = {
                    id: edge.id || uuidv4(),
                    parent: graph.vault.id,
                    from: edge.from,
                    to: edge.to,
                    fromNode,
                    toNode,
                    original: edge
                }

                vault.edgesMap.set(newEdge.id, newEdge);
            });

            this.vaults[graph.vault.id] = vault;
        });
    }

    getEdge(id) {
        for (let vault of this.vaults) {
            if (vault.edgesMap.has(id)) {
                return vault.edgesMap.get(id);
            }
        }
    }

    getNode(id) {
        for (let vault of this.vaults) {
            if (vault.nodesMap.has(id)) {
                return vault.nodesMap.get(id);
            }
        }
    }

    getGraph(id) {
        const edges = [];
        const nodes = [];
        if (id && this.vaults[id]) {
            edges.push(...Array.from(this.vaults[id].edgesMap.values()));
            nodes.push(...Array.from(this.vaults[id].nodesMap.values()));
        }
        else {
            for (let vault of this.vaults) {
                edges.push(...Array.from(vault.edgesMap.values()));
                nodes.push(...Array.from(vault.nodesMap.values()));
            }
        }

        return {
            edges,
            nodes
        }
    }

    getGraphArray() {
        return this.vaults.values();
    }

    getVaultIds() {
        return this.vaults.keys();
    }

    getCopiedVault(targetId, edgeIds) {
        const vault = this.getGraphArray().find((it) => it.nodesMap.has(targetId));
        if (!vault) {
            return;
        }

        const targetNode = vault.nodesMap.get(targetId);
        if (targetNode.type !== "FILE") {
            return;
        }

        const edgesForDeleteMap = new Map();
        const selectedEdgesMap = new Map();
        const selectedNodesMap = new Map();

        for (let edgeId of edgeIds) {
            const edge = this.getEdge(edgeId);

            if (
                edge.from === targetId && edge.toNode.type === "FILE"
                || edge.to === targetId && edge.fromNode.type === "FILE"
                || edge.toNode.type === "TAG"
            ) {
                edgesForDeleteMap.set(edge.id, edge);
            }
            else {
                selectedEdgesMap.set(edge.id, edge);
                selectedNodesMap.set(edge.toNode.id, edge.toNode);
            }
        }

        return {
            id: vault.id,
            targetNode,
            nodesMap: selectedNodesMap,
            edgesMap: selectedEdgesMap,
            redundantEdgesMap: edgesForDeleteMap
        }
    }

    selectNode(id) {
        this.selectedNode = this.getNode(id);
    }
}

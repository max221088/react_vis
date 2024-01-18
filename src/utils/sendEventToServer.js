export const sendEventToServer = (metaData, marker, edges) => {
    // console.log(metaData.edges)
    if (marker === 'add') {
        metaData.edges.push(edges);
    }
    if (marker === 'remove') {
        metaData.edges.filter(obj => !edges.includes(obj.id));
    }
    let newMeta = {
        nodes: metaData.nodes.map(node => ({
            id : node.id.split('-')[0],
            name: node.name
        })),
        edges: metaData.edges.map((edge) => ({
            from: edge.from.split('-')[0],
            to: edge.to.split('-')[0]
        }))
    }
    console.log(newMeta)
}
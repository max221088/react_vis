// Ваши два графа
const graph = [{
    nodes: [ 
        {
            id: "0-v01",
            name: "Эра больших данных и искусственного интеллекта (2016-2020 гг.).md",
            type: "FILE",
        },
        {
            id: "1-v01",
            name: "Эра больших данных и искусственного интеллекта (2016-2020 гг.).md",
            type: "FILE",
        },
        {
            id: "2-v01",
            name: "Эра больших данных и искусственного интеллекта (2016-2020 гг.).md",
            type: "FILE",
        }
      ],
      edges: [
        {
            from: "0-v01",
            id: "c8b4d0e1-e756-4f7c-acae-318bba29d311",
            to: "1-v01",
        },
        {
            from: "1-v01",
            id: "c8b4d0e1-e756-4f7c-acae-318bba29d311",
            to: "2-v01",
        },
        {
            from: "2-v01",
            id: "c8b4d0e1-e756-4f7c-acae-318bba29d311",
            to: "0-v01",
        }
      ],
},
{
    nodes: [ 
        {
            id: "0-v02",
            name: "Эра больших данных и искусственного интеллекта (2016-2020 гг.).md",
            type: "FILE",
        },
        {
            id: "1-v02",
            name: "Эра больших данных и искусственного интеллекта (2016-2020 гг.).md",
            type: "FILE",
        },
        {
            id: "2-v02",
            name: "Эра больших данных и искусственного интеллекта (2016-2020 гг.).md",
            type: "FILE",
        }
      ],
      edges: [
        {
            from: "0-v02",
            id: "c8b4d0e1-e756-4f7c-acae-318bba29d311",
            to: "1-v02",
        },
        {
            from: "1-v02",
            id: "c8b4d0e1-e756-4f7c-acae-318bba29d311",
            to: "24-v02",
        },
        {
            from: "2-v02",
            id: "c8b4d0e1-e756-4f7c-acae-318bba29d311",
            to: "0-v02",
        }
      ],
}]
    
// Функция для объединения графов
function mergeGraphs(graphs) {
    // Создаем новый граф
    const mergedGraph = {
      edges: [],
      nodes: [],
    };
  
    // Обходим каждый граф в массиве
    graphs.forEach(graph => {
      // Добавляем узлы из текущего графа
      mergedGraph.nodes.push(...graph.nodes);
  
      // Добавляем рёбра из текущего графа
      mergedGraph.edges.push(...graph.edges);
    });
  
    return mergedGraph;
  }
  
  // Вызываем функцию для объединения графов
  const resultGraph = mergeGraphs(graph);
  
  console.log(resultGraph);
  
  
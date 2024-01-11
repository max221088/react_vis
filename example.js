
const graph1 = {
        nodes: [         
            {id: '0-v01', title: 'Эра больших данных и искусственного интеллекта (2016-2020 гг.).md'},
            {id: '1-v01', title: 'смартфоны.md'},
            {id: '9-v01', title: 'Развитие камер и фотографических возможностей (2017-2022 гг.).md'},
            {id: '10-v01', title: 'Биометрические технологии (2013-2015 гг.).md'},
            {id: '4-v01', title: 'Развитие операционных систем (2008 г.).md'},
            {id: '3-v01', title: 'Эра сенсорных экранов (2007 г.).md'},
            {id: '15-v01', title: 'Появление смартфонов (2000 г.).md'},
            {id: '17-v01', title: 'Миниатюризация и улучшение дизайна (1995-2000 гг.).md'},
            {id: '16-v01', title: 'Переход к цифровым технологиям (1990-1995 гг.).md'},
            {id: '11-v01', title: 'мобильные телефоны.md', shape: 'circle'},
            {id: '5-v01', title: 'Развитие сетей связи (2010-2020 гг.).md'},
            {id: '2-v01', title: 'Расширение экосистемы приложений (2010-2020 гг.).md'},
            {id: '18-v01', title: 'Камера и мультимедийные возможности (2010 г.).md'},
            {id: '12-v01', title: '#Мобильные телефоны'},
            {id: '20-v01', title: 'Быстродействие и производительность (2012 г.).md'},
            {id: '7-v01', title: 'Идея мобильных устройств (1970-1980 гг.).md'},
            {id: '6-v01', title: 'Ранние концепты и прототипы (1980-1983 гг.).md'},
            {id: '8-v01', title: 'Появление первого мобильного телефона (1983 г.).md'},
            {id: '13-v01', title: 'Motorola DynaTAC 8000X.md'},
            {id: '14-v01', title: 'Аналоговые технологии (1980-1990 гг.).md'},
            {id: '22-v01', title: 'беспроводной зарядки.md'}, 
            {id: '21-v01', title: 'Беспроводная зарядка (2015 г.).md'},
            {id: '19-v01', title: 'биометрических технологий.md'},
        ],
        edges: [
            {from: '0-v01', to: '1-v01', id: '0bcc9c20-2d0e-45bc-a955-aa3699bae335'},
            {from: '9-v01', to: '1-v01', id: 'd73630ac-65b7-4994-841b-93ee57a17251'},
            {from: '9-v01', to: '10-v01', id: '9601fb89-7784-479e-8c02-9a4f616abbeb'},
            {from: '4-v01', to: '10-v01', id: 'b6e01b2c-f35d-488a-a677-258db5cbfc02'},
            {from: '3-v01', to: '4-v01', id: '58d6dedf-b809-43a3-b177-03cf1a8662ce'},
            {from: '15-v01', to: '3-v01', id: '997a0913-580b-4d8c-9c60-fa3b5d5ecdf0'},
            {from: '17-v01', to: '15-v01', id: 'f0c3590f-6259-4a5e-bdbd-c521f62f35c9'},
            {from: '16-v01', to: '17-v01', id: 'c08776f1-7ab0-4074-a32d-dbf9c4ea6912'},
            {from: '16-v01', to: '11-v01', id: '41f92219-80af-4240-8d63-4b11889e084b'},
            {from: '5-v01', to: '11-v01', id: '078378f0-2d32-4ce2-b30f-59ee74188bb2'},
            {from: '2-v01', to: '5-v01', id: '4937c8b4-8fd9-43e4-8a18-6ddf4be73c01'},
            {from: '18-v01', to: '2-v01', id: 'b1d382ee-d90d-4944-be71-170b73910259'},
            {from: '11-v01', to: '12-v01', id: 'ec359dc4-4a58-4ea4-8142-3c75a55e6286'},
            {from: '20-v01', to: '11-v01', id: 'd42ffec4-5a7c-4337-b8a5-263dec4267bc'},
            {from: '7-v01', to: '11-v01', id: '8bb7480b-762e-4db3-8902-dbb2bdc7b38e'},
            {from: '6-v01', to: '7-v01', id: '177f94ca-a77e-44e6-aa98-11663ebeab59'},
            {from: '6-v01', to: '8-v01', id: '608ef007-7580-400c-a321-3118e68bdaa9'},
            {from: '8-v01', to: '13-v01', id: '83d3b180-bb78-42ff-b173-0932baea248e'},
            {from: '8-v01', to: '14-v01', id: '82209ecd-74ce-4779-abd0-498cb8d9e2e5'},
            {from: '22-v01', to: '11-v01', id: '0d242603-e21e-43ec-b330-769ec6309e28'},
            {from: '21-v01', to: '22-v01', id: '3264aee3-4375-4209-8eca-d4781b913bb3'},
            {from: '10-v01', to: '19-v01', id: 'd1945d43-157b-4e74-9e97-9323debf5170'}
        ],
    };

const graph2 = {
        nodes: [
            {id: '6-v01', title: 'Ранние концепты и прототипы (1980-1983 гг.).md'},
            {id: '8-v01', title: 'Появление первого мобильного телефона (1983 г.).md'},
            {id: '13-v01', title: 'Motorola DynaTAC 8000X.md'},
            {id: '14-v01', title: 'Аналоговые технологии (1980-1990 гг.).md'},
        ],
        edges: [
            {from: '6-v01', to: '8-v01', id: '608ef007-7580-400c-a321-3118e68bdaa9'},
            {from: '8-v01', to: '13-v01', id: '83d3b180-bb78-42ff-b173-0932baea248e'},
            {from: '8-v01', to: '14-v01', id: '82209ecd-74ce-4779-abd0-498cb8d9e2e5'}
        ],
    };


const util = require('util');
// const graph = require('./src/data/metadata.json');

function findUniqueConnectionIds(graph1, graph2) {
    // Получаем все узлы из graph2
    const nodesInGraph2 = new Set(graph2.nodes.map(node => node.id));

    // Фильтруем связи из graph1, оставляя только те, которые связаны с узлами из graph2
    const connectionsInGraph2 = graph1.edges.filter(edge => nodesInGraph2.has(edge.from) || nodesInGraph2.has(edge.to));

    // Находим идентификаторы рёбер из graph1, которых нет в graph2
    const uniqueConnectionIds = connectionsInGraph2
        .filter(edge => !graph2.edges.some(edge2 => edge.from === edge2.from && edge.to === edge2.to))
        .map(edge => edge.id);

    return uniqueConnectionIds;
}

// Пример использования функции
const uniqueConnectionIds = findUniqueConnectionIds(graph1, graph2);
console.log(uniqueConnectionIds);

function removeEdgesByIds(graph, edgeIdsToRemove) {
    // Создаем копию графа, чтобы избежать изменения исходного объекта
    const modifiedGraph = {
        nodes: [...graph.nodes],
        edges: graph.edges.filter(edge => !edgeIdsToRemove.includes(edge.id)),
    };

    return modifiedGraph;
}

// Пример использования функции
const modifiedGraph1 = removeEdgesByIds(graph1, uniqueConnectionIds);
console.log(modifiedGraph1.edges.length);



    //   console.log(util.inspect(isolatedResult, { showHidden: false, depth: null }));
      // console.log(util.inspect(isolatedResult, { showHidden: false, depth: null }));
      
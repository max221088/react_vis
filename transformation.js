const { v4: uuidv4 } = require("uuid");

graph = {
  nodes: [
    {
      relativePath: ".\\Test.md",
      absolutePath:
        "D:\\ideaProjects\\syncGraphServer\\trackingDir\\dir1\\Test.md",
      name: "Test.md",
      type: "FILE",
      id: "82208780-ef1a-4011-87bd-6b3b81d48f73",
      parent: "25dfa917-cdaa-4564-b9e3-89d512d78826",
    },
    {
      id: "6e8c3f25-2f3f-43f0-8680-e618c92104d9",
      type: "TAG",
      name: "#tag1",
    },
    {
      name: "#tag2",
      type: "TAG",
      id: "ff021348-19b0-4274-812f-ac30749510c9",
    },
    {
      id: "68f71911-24ab-4815-8aff-82290e509d14",
      name: "#tag3",
      type: "TAG",
    },
    {
      id: "253dcd20-e81f-41b6-ae06-e6aaa7673e1a",
      name: "#См. также",
      type: "ANCHOR",
    },
    {
      absolutePath:
        "D:\\ideaProjects\\syncGraphServer\\trackingDir\\dir1\\space\\search-for-extraterrestrial-life.md",
      relativePath: ".\\space/search-for-extraterrestrial-life.md",
      parent: "25dfa917-cdaa-4564-b9e3-89d512d78826",
      id: "2d2f2e47-0f44-44ba-8f98-d55a3d87bfc8",
      type: "FILE",
      name: "search-for-extraterrestrial-life.md",
    },
    {
      id: "f40e8fea-f46f-4dc6-9e11-1a3adc757b07",
      type: "ANCHOR",
      name: "#Введение",
    },
    {
      id: "c362bc76-2937-4676-afc5-9513d6076803",
      type: "ANCHOR",
      name: "#Экзопланеты и Зона Жизни",
    },
    {
      name: "#Исследование Марса и Марсианских Загадок",
      type: "ANCHOR",
      id: "a6527f0a-6ce3-4215-807b-15b65bb586a9",
    },
    {
      id: "7e828230-851b-40cc-b4e4-c9734b06e3b5",
      type: "ANCHOR",
      name: "#История Радиосигналов и SETI",
    },
    {
      id: "5a6a0351-1950-4b50-9f5a-7444d7e12a44",
      type: "ANCHOR",
      name: "#Значимые Открытия и Перспективы",
    },
  ],
  edges: [
    {
      to: "5a6a0351-1950-4b50-9f5a-7444d7e12a44",
      from: "82208780-ef1a-4011-87bd-6b3b81d48f73",
    },
    {
      from: "82208780-ef1a-4011-87bd-6b3b81d48f73",
      to: "5a6a0351-1950-4b50-9f5a-7444d7e12a44",
    },
    {
      to: "68f71911-24ab-4815-8aff-82290e509d14",
      from: "5a6a0351-1950-4b50-9f5a-7444d7e12a44",
    },
    {
      from: "82208780-ef1a-4011-87bd-6b3b81d48f73",
      to: "a6527f0a-6ce3-4215-807b-15b65bb586a9",
    },
    {
      to: "c362bc76-2937-4676-afc5-9513d6076803",
      from: "f40e8fea-f46f-4dc6-9e11-1a3adc757b07",
    },
  ],
};

function transform(graph) {
  let keys = {};
  graph.nodes.forEach((node) => {
    keys[node.id] = node.type + "-$$-" + node.id;
    node.id = node.type + "-$$-" + node.id;
    let rez = node.id.match(/^(.*?)-\$\$-/)[1];
    // console.log(node.id.match(/^(.*?)-\$\$-/));
  });

  graph.edges.forEach((edge) => {
    edge.from = keys[edge.from];
    edge.to = keys[edge.to];
    edge.id =
      edge.from.match(/^(.*?)-\$\$-/)[1] +
      "-" +
      uuidv4().toString() +
      "-" +
      edge.to.match(/^(.*?)-\$\$-/)[1];
    console.log(edge.id.match(/^([^\-]+)/)[1]);
    console.log(edge.id.match(/[^-]+$/)[0]);
  });

  //   console.log(graph.edges);
}

transform(graph);

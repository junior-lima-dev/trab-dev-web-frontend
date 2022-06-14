const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const fs = require("fs/promises");

const app = express();
const porta = 9090;
const rootPath = __dirname + "/app/";
app.set("view engine", "ejs");

const user = [
  {
    title: "ASSISTÊNCIA TÉCNICA",
    description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea.
        `,
  },
  {
    title: "ASSISTÊNCIA TÉCNICA",
    description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea.
        `,
  },
  {
    title: "ASSISTÊNCIA TÉCNICA",
    description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea.
        `,
  },
];

const reports = [
  {
    title: "VEndas",
  },
  {
    title: "Faturamento",
    qtd: 5,
  },
  {
    title: "Vendas Diária",
    qtd: 17,
  },
  {
    title: "Teste",
  },
];

app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.render("pages/index", {
    articles: user,
  });
});

app.get("/products", async function (req, res) {
  async function loadData() {
    const fileName = __dirname + "/data/products.json";
    try {
      const data = await fs.readFile(fileName, "utf8");

      const productsData = JSON.parse(data);

      return productsData;
    } catch (err) {
      console.log(err);
    }
  }

  const productsData = await loadData();

  res.render("pages/products", {
    data: productsData,
  });
});

app.get("/reports", function (req, res) {
  res.render("pages/reports", {
    reports: reports,
  });
});

app.get("/login-register", function (req, res) {
  res.render("pages/login-register");
});

app.get("/stock", async function (req, res) {
  async function loadData() {
    const fileName = __dirname + "/data/stock.json";
    try {
      const data = await fs.readFile(fileName, "utf8");

      const stockData = JSON.parse(data);

      return stockData;
    } catch (err) {
      console.log(err);
    }
  }

  const stockData = await loadData();

  res.render("pages/stock", {
    stock: stockData,
  });
});

app.get("/product-detail", function (req, res) {
  res.render("pages/product-detail");
});

app.get("/teste", (req, res) => {
  console.log("RES: ", res);
  console.log("REQ: ", req);

  res.sendFile(path.join(rootPath + "teste/index.html"));

  /*res.render("pages/index", {
    user: user,
  });*/
});

app.get("/add-product", (req, res) => {
  res.render("pages/add-product");
});

app.post("/add-product", async (req, res) => {
  async function loadData() {
    const fileName = __dirname + "/data/stock.json";
    try {
      const data = await fs.readFile(fileName, "utf8");
      const dataJSON = JSON.parse(data);

      const content = [
        ...dataJSON,
        {
          title: req.body.title,
          qtd: req.body.qtd,
        },
      ];

      await fs.writeFile(fileName, JSON.stringify(content));

      const newData = await fs.readFile(fileName, "utf8");

      const stockData = JSON.parse(newData);

      return stockData;
    } catch (err) {
      console.log(err);
    }
  }

  const stockData = await loadData();

  res.render("pages/stock", {
    stock: stockData,
  });
});

app.listen(porta, function () {
  console.log("Server listening on port " + porta);
});

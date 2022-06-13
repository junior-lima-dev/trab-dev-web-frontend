const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

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

const stock = [
  {
    title: "Produto teste 1",
    qtd:10
  },
  {
    title: "Produto teste 2",
    qtd:5
  },
  {
    title: "Produto teste 3",
    qtd:17
  },
  {
    title: "Produto teste 4",
    qtd:12
  },
];


const reports = [
  {
    title: "VEndas",
  },
  {
    title: "Faturamento",
    qtd:5
  },
  {
    title: "Vendas Diária",
    qtd:17
  },
  {
    title: "Teste",
  },
];

app.use(express.static("public"));

// app.use(expressLayouts);

app.get("/", function (req, res) {
  // res.sendFile(path.join(rootPath+'home/index.html'));
  res.render("pages/index", {
    articles: user,
  });
});

app.get("/products", function (req, res) {
  // res.sendFile(path.join(rootPath+'products/index.html'));

  res.render("pages/products", {
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  });
});

app.get("/reports", function (req, res) {
  // res.sendFile(path.join(rootPath + "reports/index.html"));

  res.render("pages/reports",{
    reports:reports
  });
});

app.get("/login-register", function (req, res) {
  // res.sendFile(path.join(rootPath + "reports/index.html"));

  res.render("pages/login-register");
});

app.get("/stock", function (req, res) {
  // res.sendFile(path.join(rootPath + "stock/index.html"));

  res.render("pages/stock",{
    stock:stock,
  });
});

app.get("/product-detail", function (req, res) {
  //   res.sendFile(path.join(rootPath + "stock/index.html"));

  res.render("pages/product-detail");
});

app.get("/teste", (req, res) => {
  res.render("pages/index", {
    user: user,
  });
});

app.listen(porta, function () {
  console.log("Server listening on port " + porta);
});

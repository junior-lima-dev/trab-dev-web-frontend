const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const fs = require("fs/promises");
const session = require("express-session");
const fetch = require("node-fetch");

const app = express();
const porta = 9090;
const rootPath = __dirname + "/app/";
const srcPath = __dirname + "/views";
console.log(srcPath);
app.set("view engine", "ejs");
app.set("views", srcPath);

const SESSION_TIME_IN_HOURS = 1000 * 60 * 60 * 2; // 2 horas

const {
  SESS_NAME = "trab-dev-web-frontend",
  SESS_LIFITIME = SESSION_TIME_IN_HOURS,
  NODE_ENV = "dev",
  SESS_SECRET = "123@trab_dev_web!",
  BASE_URL_API = "https://7677-177-22-40-82.sa.ngrok.io/", // Substituir pelo localhost
} = process.env;

const IN_PROD = NODE_ENV === "prod";

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
    title: "Vendas",
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

console.log();

app.use(express.static(__dirname + "/public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFITIME,
      sameSite: true,
      secure: IN_PROD,
    },
  })
);

function redirectToLogin(req, res, next) {
  console.log("VALIDATE: ", req.session.auth_token);

  if (!req.session.auth_token) {
    res.redirect("/login");
  } else {
    next();
  }
}

function redirectToHome(req, res, next) {
  if (req.session.auth_token) {
    res.redirect("/");
  } else {
    next();
  }
}

app.get("/", function (req, res) {
  console.log("DADOS DE SESSÂO:", req.session);

  const { auth_token } = req.session;

  const params = {
    articles: user,
    admin: auth_token ? true : false,
    auth: auth_token ? true : false,
  };

  res.render("pages/index", params);
});

app.get("/login", redirectToHome, function (req, res) {
  res.render("pages/login", { error: false });
});

app.post("/login", async function (req, res) {
  const { email, password } = req.body;

  async function loadusers() {
    const fileName = __dirname + "/data/users.json";

    try {
      const data = await fs.readFile(fileName, "utf8");

      const usersData = JSON.parse(data);

      return usersData;
    } catch (err) {
      console.log(err);
    }
  }

  const users = await loadusers();

  const user = users.filter((user) => {
    if (user.e_mail === email && user.pass === password) {
      return user;
    }
  });

  console.log("Usuario: ", user);

  if (user.length > 0) {
    req.session.auth_token = "lkqwerjwkjrwjerlkwe@dsdslkndjkf";

    return res.redirect("/");
  } else {
    res.render("pages/login", { error: true });
  }
});

app.get("/logout", function (req, res) {
  console.log;
  req.session.destroy((err) => {
    if (err) {
      console.log("error");

      return res.redirect("/");
    }

    res.clearCookie(SESS_NAME);

    res.redirect("/");
  });
});

app.get("/register", function (req, res) {
  res.render("pages/register");
});

app.get("/products", async function (req, res) {
  const { auth_token } = req.session;

  const productsData = await fetch(BASE_URL_API + "products", {
    method: "GET",
  }).then(async (res) => await res.json());

  console.log("RESPOSTA API: ", productsData);

  // async function loadData() {
  //   const fileName = __dirname + "/data/products.json";
  //   try {
  //     const data = await fs.readFile(fileName, "utf8");

  //     const productsData = JSON.parse(data);

  //     return productsData;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const productsData = await loadData();

  const params = {
    data: productsData,
    admin: auth_token ? true : false,
    auth: auth_token ? true : false,
  };

  res.render("pages/products", params);
});

app.get("/product-Cart", function (req, res) {
  const { auth_token } = req.session;

  const params = {
    admin: auth_token ? true : false,
    auth: auth_token ? true : false,
  };

  res.render("pages/product-Cart", params);
});

app.get("/checkout", redirectToLogin, function (req, res) {
  const { auth_token } = req.session;

  console.log(req.url);

  const params = {
    reports: reports,
    admin: auth_token ? true : false,
    auth: auth_token ? true : false,
  };
  res.render("pages/checkout", params);
});

app.post("/checkout", function (req, res) {
  const { auth_token } = req.session;

  const params = {
    reports: reports,
    admin: auth_token ? true : false,
    auth: auth_token ? true : false,
  };

  console.log(req.body);
  const a = JSON.parse(req.body.productsData);
  console.log(a[0]);

  res.render("pages/checkout", params);
});

app.get("/reports", redirectToLogin, function (req, res) {
  const { auth_token } = req.session;

  const params = {
    reports: reports,
    admin: auth_token ? true : false,
    auth: auth_token ? true : false,
  };

  res.render("pages/reports", params);
});

app.get("/login-register", function (req, res) {
  res.render("pages/login-register");
});

app.get("/stock", redirectToLogin, async function (req, res) {
  const { auth_token } = req.session;

  async function loadData() {
    const fileName = __dirname + "/data/products.json";
    try {
      const data = await fs.readFile(fileName, "utf8");

      const stockData = JSON.parse(data);

      return stockData;
    } catch (err) {
      console.log(err);
    }
  }

  const stockData = await loadData();

  const params = {
    stock: stockData,
    admin: auth_token ? true : false,
    auth: auth_token ? true : false,
  };

  res.render("pages/stock", params);
});

app.get("/product-detail", async function (req, res) {
  const { auth_token } = req.session;

  const { productId } = req.query;

  const productsDetail = await fetch(
    BASE_URL_API + `products?id=${productId}`,
    {
      method: "GET",
    }
  ).then(async (res) => await res.json());

  const params = {
    detail: productsDetail[0],
    admin: auth_token ? true : false,
    auth: auth_token ? true : false,
  };

  res.render("pages/product-detail", params);
});

app.get("/teste", (req, res) => {
  console.log("RES: ", res);
  console.log("REQ: ", req);

  res.sendFile(path.join(rootPath + "teste/index.html"));

  /*res.render("pages/index", {
    user: user,
  });*/
});

app.get("/add-product", redirectToLogin, (req, res) => {
  const { auth_token } = req.session;

  const params = {
    admin: auth_token ? true : false,
    auth: auth_token ? true : false,
  };

  res.render("pages/add-product", params);
});

app.post("/add-product", async (req, res) => {
  const { auth_token } = req.session;

  async function loadData() {
    const fileName = __dirname + "/data/products.json";
    try {
      const data = await fs.readFile(fileName, "utf8");
      const dataJSON = JSON.parse(data);

      const content = [
        ...dataJSON,
        {
          img: "https://i.imgur.com/OdRSpXG.jpg",
          name: req.body.title,
          price: "$" + parseFloat(req.body.value).toFixed(2),
          quantity: req.body.qtd,
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

  const params = {
    stock: stockData,
    admin: auth_token ? true : false,
    auth: auth_token ? true : false,
  };

  res.render("pages/stock", params);
});

app.post("/add-user", async (req, res) => {
  async function insertuser() {
    const fileName = __dirname + "/data/users.json";
    const data = await fs.readFile(fileName, "utf8");
    const dataJSON = JSON.parse(data);
    try {
      const content = [
        ...dataJSON,
        {
          e_mail: req.body.e_mail,
          pass: req.body.pass,
          cpf: req.body.cpf,
          cep: req.body.cep,
        },
      ];

      await fs.writeFile(fileName, JSON.stringify(content));
    } catch (err) {
      console.log(err);
    }
  }

  await insertuser();

  // req.session.auth_token = "123456";

  return res.redirect("/login");
});

app.get("/about", function (req, res) {
  const { auth_token } = req.session;

  const params = {
    admin: auth_token ? true : false,
    auth: auth_token ? true : false,
  };

  res.render("pages/about", params);
});

app.get("/contact", function (req, res) {
  const { auth_token } = req.session;

  const params = {
    admin: auth_token ? true : false,
    auth: auth_token ? true : false,
  };

  res.render("pages/contact", params);
});

app.get("/minhas-compras", function (req, res) {
  const { auth_token } = req.session;

  const params = {
    compras: [{img: "data:image/png;base64,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", nome: "Produto 1", desc: "Descrição 1"}, {img: "data:image/png;base64,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", nome: "Produto 2", desc: "Descrição 2"}],
    admin: auth_token ? true : false,
    auth: auth_token ? true : false,
  };

  res.render("pages/minhas-compras", params);
});

app.listen(porta, function () {
  console.log("Server listening on port " + porta);
});

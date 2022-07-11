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

  // const auth = await fetch(BASE_URL_API + "login", {
  //   method: "POST",
  //   body: {
  //     name: "",
  //     password: "",
  //   },
  // }).then(async (res) => await res.json());

  // console.log("Auth: ", auth);

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

app.listen(porta, function () {
  console.log("Server listening on port " + porta);
});

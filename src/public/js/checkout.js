window.addEventListener("load", function () {
  //   const teste = document.getElementById("testeJr4545454");

  //   const a = JSON.stringify([{ nome: Junior, preco: 25, qtd: 10 }]);

  //   teste.setAttribute("value", "dajslkdjaslkdjalksjdlaskjdlaksjdlka");
  const storagedProducts = window.localStorage.getItem("products");

  if (storagedProducts) {
    const products = JSON.parse(storagedProducts);

    document
      .getElementById("testeJr")
      .setAttribute("value", JSON.stringify(products));
  }
});

//

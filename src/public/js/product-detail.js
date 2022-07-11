function addCart(product) {
  const storagedProducts = window.localStorage.getItem("products");
  if (storagedProducts) {
    const products = JSON.parse(storagedProducts);

    products.push(product);
    window.localStorage.setItem("products", JSON.stringify(products));
  } else {
    const products = [product];
    window.localStorage.setItem("products", JSON.stringify(products));
  }

  alert("Produto adicionado ao carrinho!");
  window.location.href = "/product-Cart";
}

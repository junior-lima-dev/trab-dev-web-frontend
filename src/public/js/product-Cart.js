window.addEventListener("load", function () {
  const element = this.document.getElementById("containerCart");
  let content = "";
  let container = "";
  let totalPrice = 0;

  const storagedProducts = window.localStorage.getItem("products");

  console.log(storagedProducts);

  if (storagedProducts) {
    const products = JSON.parse(storagedProducts);

    products.map((product, index) => {
      totalPrice = totalPrice + Number(product.valor);
      content =
        content +
        `<div class="row">
            <div class="col-xs-2"><img class="img-responsive" src="${
              product.ds_imagem
            }" alt="img">
            </div>
            <div class="col-xs-4">
                <h4 class="product-name"><strong>${
                  product.nome
                }</strong></h4><h4><small>${product.descricao}</small></h4>
            </div>
            <div class="col-xs-6">
                <div class="col-xs-6 text-right">
                    <h6><strong><span id="referenceProdCart${index + 1}">${
          product.valor
        }</span> <span class="text-muted">x</span></strong></h6>
                </div>
                <div class="col-xs-4">
                    <input type="text" id="refProdCartInput${
                      index + 1
                    }" class="form-control input-sm" value="1">
                </div>
                <div class="col-xs-2">
					<button type="button" class="btn btn-link btn-xs" onclick="addOneProduct('referenceProdCart${
            index + 1
          }', 'refProdCartInput${index + 1}')">
						<span class="glyphicon glyphicon-plus"> </span>
					</button>
					<button type="button" class="btn btn-link btn-xs" onclick="removeOneProduct('referenceProdCart${
            index + 1
          }', 'refProdCartInput${index + 1}')">
						<span class="glyphicon glyphicon-minus"> </span>
					</button>
					<button type="button" class="btn btn-link btn-xs">
                        <span class="glyphicon glyphicon-trash"> </span>
                    </button>
                </div>
            </div>
        </div>`;
    });
    container = `<div class="row card-cart-products">
		<div class="col-xs-8">
			<div class="panel panel-info">
				<div class="panel-heading ">
					<div class="panel-title">
						<div class="row">
							<div class="col-xs-6">
								<h5><span class="glyphicon glyphicon-shopping-cart"></span> Meu carrinho</h5>
							</div>
							<div class="col-xs-6">
								<button type="button" class="btn btn-primary btn-sm btn-block ">
									<span class="glyphicon glyphicon-share-alt"></span> Continuar comprando
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="panel-body" id="cartContainer">
                    ${content}
				</div>
				<div class="panel-footer" style="background-color: #f7ead9;">
					<div class="row text-center">
						<div class="col-xs-9">
							<h4 class="text-right">Valor total: <strong>R$ <span id="refProdCartTotalPrice">${totalPrice.toFixed(
                2
              )}</span></strong></h4>
						</div>
						<div class="col-xs-3">
							<button type="button" class="btn btn-success btn-block" onclick="updateQtdProducts()">
								Ir para pagamento
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>`;
  } else {
    container = "<div> O carrinho está vazio.</div>";
  }

  element.innerHTML = container;
});

function addOneProduct(id, id2) {
  const prodPrice = document.getElementById(id).textContent;
  const prodQtd = document.getElementById(id2);
  const totalPriceCurrent = document.getElementById("refProdCartTotalPrice");

  const prodQtdValue = Number(prodQtd.getAttribute("value")) + 1;

  // console.log(totalPriceCurrent.textContent, prodPrice, prodQtdValue);
  // console.log("total: ", totalPrice);

  const totalPrice =
    Number(totalPriceCurrent.textContent) +
    prodQtdValue * Number(prodPrice) -
    (prodQtdValue - 1) * Number(prodPrice);

  prodQtd.setAttribute("value", prodQtdValue);
  totalPriceCurrent.innerHTML = `<span>${totalPrice.toFixed(2)}</span>`;
}

function removeOneProduct(id, id2) {
  const prodPrice = document.getElementById(id).textContent;
  const prodQtd = document.getElementById(id2);
  const totalPriceCurrent = document.getElementById("refProdCartTotalPrice");

  let prodQtdValue = Number(prodQtd.getAttribute("value"));

  //   console.log("*****", prodQtdValue);

  //   console.log(totalPriceCurrent.textContent, prodPrice, prodQtdValue); // 60 - 1*20 + 1-1*20 = 40

  const totalPrice =
    Number(totalPriceCurrent.textContent) -
    prodQtdValue * Number(prodPrice) +
    (prodQtdValue > 0 ? prodQtdValue - 1 : 0) * Number(prodPrice);

  prodQtdValue = prodQtdValue > 0 ? prodQtdValue - 1 : 0;
  //   console.log("total: ", totalPrice);

  prodQtd.setAttribute("value", prodQtdValue);
  totalPriceCurrent.innerHTML = `<span>${totalPrice.toFixed(2)}</span>`;
}

function updateQtdProducts() {
  const storagedProducts = window.localStorage.getItem("products");

  if (storagedProducts) {
    const products = JSON.parse(storagedProducts);

    const updatedProducts = products.map((product, index) => {
      const prodQtd = document
        .getElementById("refProdCartInput" + (index + 1))
        .getAttribute("value");

      console.log("+++++++++++++++++", prodQtd);

      const prod = {
        ...product,
        quantidade: prodQtd,
      };

      return prod;
    });

    console.log("**********", updatedProducts);

    window.localStorage.setItem("products", JSON.stringify(updatedProducts));
  } else {
    console.log("nada");
  }

  window.location.href = "/checkout";
}

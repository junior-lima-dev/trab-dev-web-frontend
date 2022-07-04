
window.addEventListener("load", function (){

    const element= this.document.getElementById("containerCart");
    console.log(element);
    element.innerHTML= "<div> outro </div>"
    let content = "";
    let container = "";

    const storagedProducts = window.localStorage.getItem("products");
    if (storagedProducts){
        const products= JSON.parse(storagedProducts);
        
        products.map((product) => {
            content= content + `<div class="row">
            <div class="col-xs-2"><img class="img-responsive" src="img\\banner-frutas-1.jpg" alt="img">
            </div>
            <div class="col-xs-4">
                <h4 class="product-name"><strong>Product name</strong></h4><h4><small>Product description</small></h4>
            </div>
            <div class="col-xs-6">
                <div class="col-xs-6 text-right">
                    <h6><strong>25.00 <span class="text-muted">x</span></strong></h6>
                </div>
                <div class="col-xs-4">
                    <input type="text" class="form-control input-sm" value="1">
                </div>
                <div class="col-xs-2">
                    <button type="button" class="btn btn-link btn-xs">
                        <span class="glyphicon glyphicon-trash"> </span>
                    </button>
                </div>
            </div>
        </div>`
        });
        container= `<div class="row">
		<div class="col-xs-8">
			<div class="panel panel-info">
				<div class="panel-heading ">
					<div class="panel-title">
						<div class="row">
							<div class="col-xs-6">
								<h5><span class="glyphicon glyphicon-shopping-cart"></span> Shopping Cart</h5>
							</div>
							<div class="col-xs-6">
								<button type="button" class="btn btn-primary btn-sm btn-block ">
									<span class="glyphicon glyphicon-share-alt"></span> Continue shopping
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
							<h4 class="text-right">Total <strong>$50.00</strong></h4>
						</div>
						<div class="col-xs-3">
							<button type="button" class="btn btn-success btn-block" onclick="location.href='/checkout'">
								Checkout
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>`
    
    }
    else {
        container="<div> O carrinho está vazio.</div>"
    }

    element.innerHTML=container;
    
    
})

{/* <div class="row">
		<div class="col-xs-8">
			<div class="panel panel-info">
				<div class="panel-heading ">
					<div class="panel-title">
						<div class="row">
							<div class="col-xs-6">
								<h5><span class="glyphicon glyphicon-shopping-cart"></span> Shopping Cart</h5>
							</div>
							<div class="col-xs-6">
								<button type="button" class="btn btn-primary btn-sm btn-block ">
									<span class="glyphicon glyphicon-share-alt"></span> Continue shopping
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="panel-body" id="cartContainer">
                    <div>dfsdfsdf</div>
					<!-- <div class="row">
						<div class="col-xs-2"><img class="img-responsive" src="src\public\img\banner-frutas-1.jpg" alt="img">
						</div>
						<div class="col-xs-4">
							<h4 class="product-name"><strong>Product name</strong></h4><h4><small>Product description</small></h4>
						</div>
						<div class="col-xs-6">
							<div class="col-xs-6 text-right">
								<h6><strong>25.00 <span class="text-muted">x</span></strong></h6>
							</div>
							<div class="col-xs-4">
								<input type="text" class="form-control input-sm" value="1">
							</div>
							<div class="col-xs-2">
								<button type="button" class="btn btn-link btn-xs">
									<span class="glyphicon glyphicon-trash"> </span>
								</button>
							</div>
						</div>
					</div>
					<hr>
					<div class="row">
						<div class="col-xs-2"><img class="img-responsive" src="src\public\img\banner-frutas-1.jpg" alt="img">
						</div>
						<div class="col-xs-4">
							<h4 class="product-name"><strong>Product name</strong></h4><h4><small>Product description</small></h4>
						</div>
						<div class="col-xs-6">
							<div class="col-xs-6 text-right">
								<h6><strong>25.00 <span class="text-muted">x</span></strong></h6>
							</div>
							<div class="col-xs-4">
								<input type="text" class="form-control input-sm" value="1">
							</div>
							<div class="col-xs-2">
								<button type="button" class="btn btn-link btn-xs">
									<span class="glyphicon glyphicon-trash"> </span>
								</button>
							</div>
						</div> -->
					<!-- </div> -->
					<hr>
					<div class="row">
						<div class="text-center">
							<div class="col-xs-9">
								<h6 class="text-right">Added items?</h6>
							</div>
							<div class="col-xs-3">
								<button type="button" class="btn btn-default btn-sm btn-block">
									Update cart
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="panel-footer" style="background-color: #f7ead9;">
					<div class="row text-center">
						<div class="col-xs-9">
							<h4 class="text-right">Total <strong>$50.00</strong></h4>
						</div>
						<div class="col-xs-3">
							<button type="button" class="btn btn-success btn-block" onclick="location.href='/checkout'">
								Checkout
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>*/}
import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Pay from "./pages/Pay";
import SideBar from "./components/SideBar";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import "./App.scss";
import { totalCartItems, cartItems, addToCart } from "./util/Cart";

function App() {
	const [cartItemsCount, setcartItemsCount] = useState(totalCartItems);
	const [cartData, setcartData] = useState(JSON.parse(cartItems));

	const addCart = (data) => {
		let cart = cartData;
		let found = cart.find((product) => product.id === data.id);
		if (found) {
			found.qty++;
		} else {
			cart.push({
				id: data.id,
				name: data.product_name,
				price: data.unit_price,
				qty: 1,
			});
		}
		let count = parseInt(cartItemsCount);
		count += 1;
		addToCart(data, 1);
		setcartItemsCount(count);
		setcartData(cart);
	};

	const removeCartItem = (qty) => {
		let count = parseInt(cartItemsCount);
		count -= qty;
		setcartItemsCount(count);
	};

	return (
		<Router>
			<Container fluid>
				<ToastContainer />
				<Row>
					<Col md={2}>
						<SideBar countItems={cartItemsCount} />
					</Col>
					<Col md={10}>
						<Switch>
							<PrivateRoute exact path="/pay" component={Pay} />
							<Route exact path="/" component={ProductList} />
							<Route exact path="/signup" component={Signup} />
							<Route exact path="/login" component={Login} />
							<Route
								exact
								path="/cart"
								render={(props) => (
									<Cart
										{...props}
										removeCart={(qty) =>
											removeCartItem(qty)
										}
										cartData={cartData}
									/>
								)}
							/>
							<Route
								exact
								path="/:id"
								render={(props) => (
									<ProductDetails
										{...props}
										addToCart={addCart}
									/>
								)}
							/>
						</Switch>
					</Col>
				</Row>
			</Container>
		</Router>
	);
}

export default App;

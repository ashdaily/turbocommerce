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
import {
	totalCartItems,
	cartItems,
	addToCart,
	removeToCart,
} from "./util/Cart";
import ShopContext from "./util/ShopContext";

function App() {
	const [cartItemsCount, setcartItemsCount] = useState(totalCartItems);
	const [cartData, setcartData] = useState(cartItems);

	const value = { addToCart, cartItems, totalCartItems };

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
				out_of_stock: "no",
				qty: 1,
			});
		}
		let count = parseInt(cartItemsCount);
		count += 1;
		setcartItemsCount(count);
		setcartData(cart);
	};

	const removeCartItem = (id) => {
		let count = parseInt(cartItemsCount);
		let cart = cartData;
		let found = cart.find((cartItem) => cartItem.id === id);
		count -= found.qty;
		setcartItemsCount(count);
		cart = cart.filter((cartItem) => cartItem.id !== id);
		setTimeout(function () {
			removeToCart(id);
		}, 1000);
		setcartData(cart);
	};

	return (
		<ShopContext.Provider value={value}>
			<Router>
				<Container fluid>
					<ToastContainer />
					<Row>
						<Col md={2}>
							<SideBar />
						</Col>
						<Col md={10}>
							<Switch>
								<PrivateRoute
									exact
									path="/pay"
									component={Pay}
								/>
								<Route exact path="/" component={ProductList} />
								<Route
									exact
									path="/signup"
									component={Signup}
								/>
								<Route exact path="/login" component={Login} />
								<Route
									exact
									path="/cart"
									render={(props) => (
										<Cart
											{...props}
											removeCart={(id) =>
												removeCartItem(id)
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
										/>
									)}
								/>
							</Switch>
						</Col>
					</Row>
				</Container>
			</Router>
		</ShopContext.Provider>
	);
}

export default App;

import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { removeToCart } from "../util/Cart";
import Item from "../components/Item";
import axios from "../util/Axios";

export default (props) => {
	const [cartData, setcartData] = useState(props.cartData);

	const removeFromCart = (id) => {
		let cart = cartData;
		let found = cart.find((cartItem) => cartItem.id === id);
		cart = cart.filter((cartItem) => cartItem.id !== id);
		removeToCart(id);
		setcartData(cart);
		props.removeCart(found.qty);
	};

	useEffect(() => {
		const loadData = () => {
			let cart_id = cartData.map((product, index) =>
				(product.id)
			);
			console.log(cart_id)
			if (cart_id) {
				axios
					.get(`/api/products/in-stock/?id=${cart_id}`)
					.then((response) => {
						if (response.status === 200) {
							console.log(response.data);
						}
					});
			}
		};
		loadData();
	}, [cartData]);

	console.log(props);
	let products;
	if (cartData) {
		products = cartData.map((product, index) => (
			<Item
				key={index}
				product={product}
				removeCart={(id) => removeFromCart(id)}
			/>
		));
	}

	if (cartData.length > 0) {
		return (
			<Row className="product-details-content">
				<Col>
					<div className="table-responsive">
						<Table size="lg">
							<thead>
								<tr>
									<th>Product</th>
									<th>Quantity</th>
									<th>Price</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>{products}</tbody>
						</Table>
					</div>
				</Col>
			</Row>
		);
	} else {
		return (
			<Row className="product-details-content">
				<Col>
					<h1>Cart is Empty</h1>
				</Col>
			</Row>
		);
	}
};

import React, { useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import Item from "../components/Item";
import axios from "../util/Axios";

export default (props) => {
	const [cartData, setcartData] = useState(null);

	const loadData = () => {
		let cart_id = props.cartData.map((product, index) => product.id);
		if (cart_id) {
			axios
				.get(`/api/products/in-stock/?id=${cart_id}`)
				.then((response) => {
					if (response.status === 200) {
						let new_CartData = props.cartData.map((item, index) => {
							let found = response.data.results.find(
								(product) => product.id === item.id
							);
							if (found) {
								if (item.qty > found.quantity_per_unit) {
									item.out_of_stock = "yes";
								} else {
									item.out_of_stock = "no";
								}
							} else {
								item.out_of_stock = "yes";
							}
							return item;
						});
						setcartData(new_CartData);
					}
				});
		}
	};

	const removeFromCart = (id) => {
		props.removeCart(id);
		let cart = props.cartData;
		let found = cart.find((cartItem) => cartItem.id === id);
		cart = cart.filter((cartItem) => cartItem.id !== id);
		setcartData(cart);
	};

	if (cartData) {
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
							<tbody>
								{cartData.map((product, index) => (
									<Item
										key={index}
										product={product}
										removeCart={(id) => removeFromCart(id)}
									/>
								))}
							</tbody>
						</Table>
					</div>
				</Col>
			</Row>
		);
	} else {
		loadData();
		return (
			<Row className="product-details-content">
				<Col>
					<h1>Cart is Empty</h1>
				</Col>
			</Row>
		);
	}
};

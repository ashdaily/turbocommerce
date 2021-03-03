import React, {  useContext } from "react";
import { Row, Col, Table } from "react-bootstrap";
import Item from "../components/Item";
import { ShopContext } from "../context/ShopContext";

export default () => {
	const { cartItems } = useContext(ShopContext);

	if (cartItems.length > 0) {
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
								{cartItems.map((product, index) => (
									<Item key={index} product={product} />
								))}
							</tbody>
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

import React, { useContext } from "react";

import { ShopContext } from "../context/ShopContext";

export default ({ product }) => {
	const { removeProduct, increase, decrease } = useContext(ShopContext);

	const handleRemove = (id, variant_id) => {
		removeProduct(id, variant_id);
	};

	let quantity;

	if (product.in_stock) {
		quantity = (
			<>
				<i
					onClick={() => decrease(product.id, product.variant_id)}
					className="fa fa-minus"
				></i>
				&nbsp;
				{product.quantity}&nbsp;
				<i
					onClick={() => increase(product.id, product.variant_id)}
					className="fa fa-plus"
				></i>
			</>
		);
	} else {
		quantity = product.quantity;
	}

	return (
		<tr className={product.in_stock ? "" : "table-secondary"}>
			<td>
				{product.name} ({product.size})
				{product.in_stock ? "" : " (Out Of Stock)"}
			</td>
			<td>{quantity}</td>
			<td>{product.price}</td>
			<td>
				<button
					type="button"
					className="w-50 btn btn-danger"
					onClick={() => handleRemove(product.id, product.variant_id)}
				>
					Remove
				</button>
			</td>
		</tr>
	);
};

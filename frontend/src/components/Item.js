import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

export default ({ product, outOfStock }) => {
	const [stockText, setoutOfStock] = useState("");

	const { removeProduct, increase, decrease } = useContext(ShopContext);

	const handleRemove = (id, variant_id, size) => {
		removeProduct(id, variant_id, size);
	};

	useEffect(() => {
		if (outOfStock === "yes") {
			setoutOfStock("table-secondary");
		}
	}, [outOfStock]);

	let quantity;

	if (outOfStock === "yes") {
		quantity = product.quantity;
	} else {
		quantity = (
			<>
				<i
					onClick={() =>
						decrease(product.id, product.variant_id, product.size)
					}
					className="fa fa-minus"
				></i>{" "}
				{product.quantity}{" "}
				<i
					onClick={() =>
						increase(product.id, product.variant_id, product.size)
					}
					className="fa fa-plus"
				></i>
			</>
		);
	}

	return (
		<tr className={stockText}>
			<td>
				{product.name} ({product.size})
				{outOfStock === "yes" ? " (Out Of Stock)" : ""}
			</td>
			<td>{quantity}</td>
			<td>{product.price}</td>
			<td>
				<button
					type="button"
					className="w-50 btn btn-danger"
					onClick={() =>
						handleRemove(
							product.id,
							product.variant_id,
							product.size
						)
					}
				>
					Remove
				</button>
			</td>
		</tr>
	);
};

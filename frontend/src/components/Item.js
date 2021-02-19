import React from "react";

export default (props) => {

	function handleRemove (id) {
		props.removeCart(id);
	};

	console.log(props);

	return (
		<tr>
			<td>{props.product.name}</td>
			<td>{props.product.qty}</td>
			<td>{props.product.price}</td>
			<td>
				<button
					type="button"
					className="w-50 btn btn-danger"
					onClick={() => handleRemove(props.product.id)}
				>
					Remove
				</button>
			</td>
		</tr>
	);
};

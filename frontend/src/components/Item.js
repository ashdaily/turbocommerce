import React, { useEffect, useState } from "react";

export default (props) => {
	const [product, setProducts] = useState(props.product);
	const [outOfStock, setoutOfStock] = useState('');

	function handleRemove (id) {
		props.removeCart(id);
	};

    useEffect(() => {
        if(props.product.out_of_stock === 'yes') {
            setoutOfStock('table-secondary')
        }
    }, [props])

	return (
		<tr className={outOfStock}>
			<td>{product.name + (product.out_of_stock === 'yes' ? ' (Out Of Stock)' : '')}</td>
			<td>{product.qty}</td>
			<td>{product.price}</td>
			<td>
				<button
					type="button"
					className="w-50 btn btn-danger"
					onClick={() => handleRemove(product.id)}
				>
					Remove
				</button>
			</td>
		</tr>
	);
};

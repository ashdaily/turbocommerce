import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext"

export default ({product}) => {
	const [outOfStock, setoutOfStock] = useState('');

	const { removeProduct } = useContext(ShopContext);

	function handleRemove (id) {
		removeProduct(id);
	};

    useEffect(() => {
        if(product.out_of_stock === 'yes') {
            setoutOfStock('table-secondary')
        }
    }, [product])

	return (
		<tr className={outOfStock}>
			<td>{product.name + (product.out_of_stock === 'yes' ? ' (Out Of Stock)' : '')}</td>
			<td>{product.quantity}</td>
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

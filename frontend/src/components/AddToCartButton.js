import React, { useContext } from "react";
import { Button } from "react-bootstrap";

import { ShopContext } from "../context/ShopContext";

const AddToCartButton = ({ data, variant }) => {
	const { addProduct, cartItems, increase, decrease } = useContext(ShopContext);

	const isInCart = (product, variant) => {
		return cartItems.find((item) => item.id === product.id && item.variant_id === variant.id);
	};
    
    const productQuantity = (product, variant) => {
        let item =  cartItems.find((item) => item.id === product.id && item.variant_id === variant.id);
        return item ? item.quantity : 0;
    }

	if (isInCart(data, variant)) {
		return (
			<Button
				variant="primary"
				className="w-100 mt-4"
			>
				<i onClick={() => decrease(data.id, variant.id)} className="fa fa-minus"></i> {productQuantity(data, variant)} <i onClick={() => increase(data.id, variant.id)} className="fa fa-plus"></i>
			</Button>
		);
	} else {
		return (
			<Button
				variant="primary"
				className="w-100 mt-4"
				onClick={() => addProduct(data, variant)}
			>
				Add to cart <i className="fa fa-shopping-cart"></i>
			</Button>
		);
	}
};

export default AddToCartButton;

import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { ShopContext } from "../context/ShopContext";

const AddToCartButton = ({ data, variant, size }) => {
	const { addProduct, cartItems, increase, decrease } = useContext(ShopContext);

	const isInCart = (product, variant, size) => {
		return !!cartItems.find((item) => item.id === product.id && item.variant_id === variant.id && size === item.size);
	};
    
    const productQuantity = (product, variant, size) => {
        let item =  cartItems.find((item) => item.id === product.id && item.variant_id === variant.id && size === item.size);
        return item ? item.quantity : 0;
    }

	if (isInCart(data, variant, size)) {
		return (
			<Button
				variant="primary"
				className="w-100 mt-4"
			>
				<i onClick={() => decrease(data, variant, size)} className="fa fa-minus"></i> {productQuantity(data, variant, size)} <i onClick={() => increase(data, variant, size)} className="fa fa-plus"></i>
			</Button>
		);
	} else {
		return (
			<Button
				variant="primary"
				className="w-100 mt-4"
				onClick={() => addProduct(data, variant, size)}
			>
				Add to cart <i className="fa fa-shopping-cart"></i>
			</Button>
		);
	}
};

export default AddToCartButton;

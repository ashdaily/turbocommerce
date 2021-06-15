import React, { useContext } from "react";
import { Button } from "react-bootstrap";

import { ShopContext } from "../context/ShopContext";

const AddToCartButton = ({ data, variant }) => {
  const { addProduct, cartItems, increase, decrease } = useContext(ShopContext);

  const isInCart = (product, variant) => {
    return cartItems.find(
      (item) => item.id === product.id && item.variant_id === variant.id
    );
  };

  const productQuantity = (product, variant) => {
    let item = cartItems.find(
      (item) => item.id === product.id && item.variant_id === variant.id
    );
    return item ? item.quantity : 0;
  };

  if (isInCart(data, variant)) {
    return (
      <div className="w-100 mx-2 cart-btns">
        <i
          onClick={() => decrease(data.id, variant.id)}
          className="fa fa-minus"
        ></i>
        <span>{productQuantity(data, variant)}</span>
        <i
          onClick={() => increase(data.id, variant.id)}
          className="fa fa-plus"
        ></i>
      </div>
    );
  } else {
    return (
      <Button
          variant="outline-secondary"
        className="w-100 mx-2 add-to-cart-btn"
        onClick={() => addProduct(data, variant)}
      >
        Add to cart <i className="fa fa-shopping-cart"></i>
      </Button>
    );
  }
};

export default AddToCartButton;

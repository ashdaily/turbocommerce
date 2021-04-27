import React, { useContext } from "react";
import { Button } from "react-bootstrap";

import { ShopContext } from "../context/ShopContext";

const WishlistButton = ({ data }) => {
  const {
    addProductToWishlist,
    removeProductFromWishlist,
    wishlistItems,
  } = useContext(ShopContext);

  const isInWishlist = (product) => {
    return wishlistItems.find((item) => item.id === product.id);
  };
  if (isInWishlist(data)) {
    return (
      <Button
        variant="danger"
        className="w-100 mt-3"
        onClick={() => removeProductFromWishlist(data.id)}
      >
        Remove From wishlist <i className="fa fa-heart"></i>
      </Button>
    );
  } else {
    return (
      <Button
        variant="danger"
        className="w-100 mt-3"
        onClick={() => addProductToWishlist(data)}
      >
        Add to wishlist <i className="fa fa-heart"></i>
      </Button>
    );
  }
};

export default WishlistButton;

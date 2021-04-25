import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

import { ShopContext } from "../context/ShopContext";
import { isLoggedIn } from "../util/Auth";
import axios from "../util/Axios";

const WishlistButton = ({ data }) => {
  const {
    addProductToWishlist,
    removeProductFromWishlist,
    wishlistItems,
  } = useContext(ShopContext);

  const isInWishlist = (product) => {
    return wishlistItems.find((item) => item.id === product.id);
  };

  const addToWishlisht = () => {
    if (!isLoggedIn) {
      toast.error("Please login first before adding product to wishlist!");
      return;
    }
    axios
      .post("api/customer/wishlist/", {
        product: data.id,
      })
      .then(() => {
        addProductToWishlist(data);
        toast.success("Product added to wishlist!");
      });
  };

  const removeFromWishlisht = () => {
    axios.delete(`api/customer/wishlist/${data.id}/`).then(() => {
      removeProductFromWishlist(data);
      toast.success("Product removed to wishlist!");
    });
  };

  if (isInWishlist(data)) {
    return (
      <Button
        variant="danger"
        className="w-100 mt-3"
        onClick={(data) => removeFromWishlisht(data)}
      >
        Remove From wishlist <i className="fa fa-heart"></i>
      </Button>
    );
  } else {
    return (
      <Button
        variant="outline-danger"
        className="w-100 mt-3"
        onClick={(data) => addToWishlisht(data)}
      >
        Add to wishlist <i className="far fa-heart"></i>
      </Button>
    );
  }
};

export default WishlistButton;

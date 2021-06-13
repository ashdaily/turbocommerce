import React from "react";
import {Button} from "react-bootstrap";

const WishlistButton = ({add, remove, isWishlisted}) => {
  if (isWishlisted) {
    return (
        <Button
            variant="danger"
            className="w-100 mt-3"
            onClick={(data) => remove(data)}
        >
          Remove From wishlist <i className="fa fa-heart"></i>
        </Button>
    );
  } else {
    return (
        <Button
            variant="outline-danger"
            className="w-100 mt-3"
            onClick={(data) => add(data)}
        >
          Add to wishlist <i className="far fa-heart"></i>
        </Button>
    );
  }
};

export default WishlistButton;

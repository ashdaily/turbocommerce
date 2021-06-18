import React from "react";
import {Button} from "react-bootstrap";
import styles from './Style.module.scss';
import csx from 'classnames';

const WishlistButton = ({add, remove, isWishlisted}) => {
  if (isWishlisted) {
    return (
        <Button
            variant="link"
            className={csx(styles.wishlistBtn, styles.detailWishlist, 'mx-2', 'wishlist-icon')}
            onClick={(data) => remove(data)}
        >
          <i className="fa fa-heart"></i>
        </Button>
    );
  } else {
    return (
        <Button
            variant="link"
            className={csx(styles.wishlistBtn, styles.detailWishlist, 'mx-2', 'wishlist-icon')}
            onClick={(data) => add(data)}
        >
          <i className="far fa-heart"></i>
        </Button>
    );
  }
};

export default WishlistButton;

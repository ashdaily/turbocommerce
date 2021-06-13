import React from "react";
import {Button} from "react-bootstrap";
import styles from './Style.module.scss';

const WishlistHeart = ({add, remove, isWishlisted}) => {

    const handleRemove = (e) => {
        e.preventDefault();
        remove();
    };

    const handleAdd = (e) => {
        e.preventDefault();
        add();
    };

    if (isWishlisted) {
        return (
            <Button
                variant="link"
                className={styles.wishlistBtn}
                onClick={handleRemove}
            >
                <i className="fa fa-heart"></i>
            </Button>
        );
    } else {
        return (
            <Button
                variant="link"
                className={styles.wishlistBtn}
                onClick={handleAdd}
            >
                <i className="far fa-heart"></i>
            </Button>
        );
    }
};

export default WishlistHeart;

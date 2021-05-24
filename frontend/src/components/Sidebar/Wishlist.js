import React, {useContext} from "react";
import {Badge, ListGroup} from "react-bootstrap";
import csx from 'classnames';
import {Link, useHistory} from "react-router-dom";
import {ShopContext} from "../../context/ShopContext";
import styles from "./Styles.module.scss";

const Wishlist = () => {
    const {totalWishlistItems} = useContext(ShopContext);
    console.log('totalWishlistItems', totalWishlistItems);
    let history = useHistory();
    return (
        <ul className={csx(styles.specialLinks, 'm-0', 'p-0')}>
            <li className="special-link special-link--1">
                <Link to="/wishlist" className="anchor-silent">
                    <i className="fa fa-heart"></i> Wishlist &nbsp;
                    <Badge variant="primary" size="md">
                        {totalWishlistItems}
                    </Badge>
                </Link>
            </li>
        </ul>
    );
};
export default Wishlist;
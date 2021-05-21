import React, {useContext} from "react";
import {Badge, ListGroup} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";

import {ShopContext} from "../../context/ShopContext";
import styles from "./Styles.module.scss";

export default (props) => {
    const {totalCartItems} = useContext(ShopContext);

    let history = useHistory();
    return (
        <ul className={styles.specialLinks}>
            <li className="special-link special-link--1">
                <Link to="/cart" className="anchor-silent">
                    <i className="fa fa-shopping-cart"></i> Cart &nbsp;
                    <Badge variant="primary" size="md">
                        {totalCartItems}
                    </Badge>
                </Link>
            </li>
        </ul>
    );
};

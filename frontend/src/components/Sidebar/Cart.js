import React, {useContext} from "react";
import {Badge} from "react-bootstrap";
import {Link} from "react-router-dom";
import csx from 'classnames';
import {ShopContext} from "../../context/ShopContext";
import styles from "./Styles.module.scss";
import EventEmitter from "../../util/EventsUtils";

export default (props) => {
    const {totalCartItems} = useContext(ShopContext);

    const handleLinkClick = () => {
        EventEmitter.dispatch(EventEmitter.TOGGLE_SIDEBAR, { close: true });
    };

    // let history = useHistory();
    return (
        <ul className={csx(styles.specialLinks, 'm-0', 'p-0')}>
            <li className="special-link special-link--1">
                <Link id={'sidebarCartLink'} onClick={handleLinkClick} to="/cart" className="anchor-silent">
                    <i className="fa fa-shopping-cart"></i>Cart
                    <Badge variant="primary" size="md"> {totalCartItems}</Badge>
                </Link>
            </li>
        </ul>
    );
};

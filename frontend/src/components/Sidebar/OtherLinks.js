import React from 'react';
import csx from "classnames";
import styles from "./Styles.module.scss";
import {Link} from "react-router-dom";
import {Badge} from "react-bootstrap";
import useWindowDimensions from "../../util/WindowDimensions";
import {checkIfMobile} from "../../util/Helpers";
import EventEmitter from "../../util/EventsUtils";

const OtherLinks = () => {
    const {width} = useWindowDimensions();

    const handleLinkClick = () => {
        if (checkIfMobile(width)) {
            EventEmitter.dispatch(EventEmitter.TOGGLE_SIDEBAR, {close: true});
        }
    };

    return (
        <ul className={csx(styles.specialLinks, 'm-0', 'p-0')}>
            <li className="special-link special-link--1">
                <Link id={'sidebarCartLink'} onClick={handleLinkClick} to="/addresses" className="anchor-silent">
                    Address
                </Link>
            </li>
        </ul>
    )
};

export default OtherLinks;

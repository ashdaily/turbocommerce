import React, {useState} from 'react';
import csx from "classnames";
import styles from "./Styles.module.scss";
import {Link} from "react-router-dom";
import {Badge} from "react-bootstrap";
import useWindowDimensions from "../../util/WindowDimensions";
import {checkIfMobile} from "../../util/Helpers";
import EventEmitter from "../../util/EventsUtils";

const OtherLinks = () => {
    const [show, setShow] = useState(false);
    const {width} = useWindowDimensions();

    const mouseEnter = () => {
        setShow(true);
        !checkIfMobile(width) && document.body.classList.add("navExpanded");
    };

    const mouseLeave = () => {
        setShow(false);
        !checkIfMobile(width) && document.body.classList.remove("navExpanded");
    };

    const handleLinkClick = () => {
        if (checkIfMobile(width)) {
            EventEmitter.dispatch(EventEmitter.TOGGLE_SIDEBAR, {close: true});
        }
    };

    const renderParentLink = () => {
        return (
            <a  href={'# '} className={styles.tier1title}>
                MY ACCOUNT
            </a>
        )
    };


    return (
        <li onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className={csx((show ? styles.outsideExpanded : ''))}>
            {renderParentLink()}
            <div className={styles.tier2}>
                <ul className={'m-0 p-0'}>
                        <li  className={csx(styles.active, styles.tier2Link)}>
                            <Link
                                to={`#`}
                                onClick={handleLinkClick}
                                className={styles.tierTitle}
                            >
                                My Account
                            </Link>
                        </li>
                        <li className={styles.categoryNameLi}>
                            <Link to={`/addresses`}
                                  onClick={handleLinkClick}
                                  id={'sidebarAddressLink'}
                                  >
                                Address
                            </Link>
                        </li>
                        <li  className={styles.categoryNameLi}>
                            <Link to="/change/password"
                                  onClick={handleLinkClick}
                                  id={'sidebarChangePassword'}
                            >
                                Change Password
                            </Link>
                        </li>
                </ul>
            </div>
        </li>
    )
};

export default OtherLinks;

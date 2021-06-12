import React, {useEffect, useRef, useState} from 'react';
import styles from './Styles.module.scss';
import csx from 'classnames';
import Logo from "./Logo";
import CategoryList from "./CategoryList";
import Cart from "./Cart";
import Wishlist from "./Wishlist";
import {isLoggedIn} from "../../util/Auth";
import Logout from "./Logout";
import LoginSignup from "./LoginSignup";
import EventEmitter from "../../util/EventsUtils";

const Sidebar = () => {
    const [isOpen, setOpen] = useState(false);
    const isOpenRef = useRef(false);
    useEffect(() => {
        EventEmitter.subscribe(EventEmitter.TOGGLE_SIDEBAR, toggleSideBar);
        document.body.addEventListener('click', bodyClick);
        return () => {
            EventEmitter.unsubscribe(EventEmitter.TOGGLE_SIDEBAR);
            document.body.removeEventListener('click', bodyClick);
        }
    }, []);


    const toggleSideBar = () => {
        if (!isOpenRef.current) {
            document.body.classList.add("navExpanded");
        } else {
            document.body.classList.remove("navExpanded");
        }
        setOpen(!isOpenRef.current);
        isOpenRef.current = !isOpenRef.current;
    };

    const bodyClick = (e) => {
        if (e.target.tagName === 'BODY') {
            if (isOpenRef.current) {
                toggleSideBar()
            }
        }
    };

    return (
        <div className={csx(styles.mainNavbar, styles.navOutsideExpandedMode, isOpen ? styles.sidebarOpened : '')}
             data-section-type="sidebar-section">
            <div className={styles.navContainer}>
                <div className={styles.logo}>
                    <Logo/>
                </div>

                <div className={styles.mainnav}>
                    <div className={styles.tier1} role="navigation" aria-label="Navigation">
                        <a className={styles.back} href="#" aria-controls="current-submenu"
                           aria-label="Return to previous menu" tabIndex="-1">
                            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <title>Left</title>
                                <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path>
                                <path d="M0-.5h24v24H0z" fill="none"></path>
                            </svg>
                        </a>

                        <CategoryList/>
                        <Cart/>
                        <Wishlist/>
                        {isLoggedIn ? <Logout/> : <LoginSignup/>}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Sidebar;

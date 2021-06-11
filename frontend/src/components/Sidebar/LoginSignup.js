import React from "react";
import {Link} from "react-router-dom";
import styles from "./Styles.module.scss";
import csx from 'classnames';

export default () => {

    return (
        <ul className={csx(styles.specialLinks, 'm-0', 'p-0')}>
            <li className="special-link special-link--1">
                <Link id={'sidebarLoginLink'} to="/login" className="anchor-silent">
                    Login
                </Link>
            </li>
            <li className="special-link special-link--1">
                <Link id={'sidebarSignupLink'} to="/signup" className="anchor-silent">
                    Signup
                </Link>
            </li>
        </ul>
    );
};

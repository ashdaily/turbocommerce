import React from "react";
import {Link} from "react-router-dom";
import styles from "./Styles.module.scss";

export default () => {

    return (
        <ul className={styles.specialLinks}>
            <li className="special-link special-link--1">
                <Link to="/login" className="anchor-silent">
                    Login
                </Link>
            </li>
            <li className="special-link special-link--1">
                <Link to="/signup" className="anchor-silent">
                    Signup
                </Link>
            </li>
        </ul>
    );
};

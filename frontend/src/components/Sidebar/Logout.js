import React from "react";
import csx from 'classnames';
import { logout } from "../../util/Auth";
import styles from "./Styles.module.scss";
import {Link} from "react-router-dom";

export default () => {
    const handleClick = (e) => {
        e.preventDefault();
        logout();
        // FIXME: confirm is there is a better way to do this
        window.location.reload();
    }
  return (
      <ul className={csx(styles.specialLinks, 'm-0', 'p-0')}>
          <li className="special-link special-link--1">
              <Link to="/" onClick={handleClick} className="anchor-silent">
      Sign out
              </Link>
          </li>
      </ul>
  );
};

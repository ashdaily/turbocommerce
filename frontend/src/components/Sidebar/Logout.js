import React from "react";
import { ListGroup } from "react-bootstrap";

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
      <ul className={styles.specialLinks}>
          <li className="special-link special-link--1">
              <Link to="/" onClick={handleClick} className="anchor-silent">
      Sign out
              </Link>
          </li>
      </ul>
  );
};

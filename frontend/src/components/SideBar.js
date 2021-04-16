import React from "react";
import { ListGroup } from "react-bootstrap";

import { isLoggedIn } from "../util/Auth";
import Logo from "../components/Logo";
import Logout from "../components/Logout";
import Cart from "./Cart";
import Wishlist from "./Wishlist";
import CategoryList from "./CategoryList";
import LoginSignup from "./LoginSignup";

export default (props) => {
  return (
    <>
      <Logo />
      <ListGroup as="ul">
        <CategoryList />
        <Cart />
        <Wishlist />
        {isLoggedIn ? <Logout /> : <LoginSignup />}
      </ListGroup>
    </>
  );
};

import React from "react";
import { ListGroup } from "react-bootstrap";

import { isLoggedIn } from "../util/Auth";
import Logo from "./Sidebar/Logo";
import Logout from "./Sidebar/Logout";
import Cart from "./Sidebar/Cart";
import Wishlist from "./Sidebar/Wishlist";
import CategoryList from "./Sidebar/CategoryList";
import LoginSignup from "./Sidebar/LoginSignup";

export default (props) => {
  return (
    <>
        <div className={'bgColor'}>
      <Logo />
      <ListGroup as="ul">
        <CategoryList />
        <Cart />
        <Wishlist />
        {isLoggedIn ? <Logout /> : <LoginSignup />}
      </ListGroup>
        </div>
    </>
  );
};

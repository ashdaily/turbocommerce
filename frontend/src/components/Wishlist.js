import React, { useContext } from "react";
import { Badge, ListGroup } from "react-bootstrap";

import { useHistory } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Wishlist = () => {
  const { totalWishlistItems } = useContext(ShopContext);

  let history = useHistory();
  return (
    <ListGroup.Item
      as="li"
      activeKey="/"
      style={{ cursor: "pointer" }}
      onClick={() => {
        history.push("/wishlist");
      }}
      key={100}
    >
      <i className="fa fa-heart"></i> Wishlist &nbsp;
      <Badge variant="primary" size="md">
        {totalWishlistItems}
      </Badge>
    </ListGroup.Item>
  );
};
export default Wishlist;

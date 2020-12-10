import React from "react";
import { ListGroup } from "react-bootstrap";


export default ()=> {
    let cartItemsCount = 0;
    return(
        <ListGroup.Item
            as="li"
            activeKey="/"
            style={{ cursor: "pointer" }}
        >
            <i className="fa fa-shopping-cart"></i> Cart {`(${cartItemsCount})`}
        </ListGroup.Item>
    )
}

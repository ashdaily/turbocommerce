import React from "react";
import { Badge, ListGroup } from "react-bootstrap";


export default ()=> {
    let cartItemsCount = 0;
    return(
        <ListGroup.Item
            as="li"
            activeKey="/"
            style={{ cursor: "pointer" }}
            key={100}
        >
            <i className="fa fa-shopping-cart"></i> Cart
            &nbsp;<Badge variant="primary" size="md">{cartItemsCount}</Badge>
        </ListGroup.Item>
    )
}

import React from "react";
import { ListGroup } from "react-bootstrap";
import { logout } from "../util/Auth";

export default ()=> {
    return(
        <ListGroup.Item
          as="li"
          activeKey="/"
          style={{ cursor: "pointer" }}
          onClick={()=>{
            logout()
            // FIXME: confirm is there is a better way to do this
            window.location.reload()
          }}
        >
          Sign out
        </ListGroup.Item>
    )
}

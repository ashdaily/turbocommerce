import React from "react";
import { ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {logout} from "../util/Auth";


export default () => {
  let history = useHistory();
  return (
    <ListGroup as="ul">
      <ListGroup.Item
        as="li"
        style={{ cursor: "pointer" }}
        onClick={()=>{
          logout()
          history.push("/login");
        }}
      >
        Logout
      </ListGroup.Item>
    </ListGroup>
  );
};

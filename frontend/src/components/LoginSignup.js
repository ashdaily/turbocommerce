import React from "react";
import { ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";


export default ()=> {
    let history = useHistory();

    return(
        <>
            <ListGroup.Item
            as="li"
            activeKey="/"
            style={{ cursor: "pointer" }}
            onClick={()=>{
              history.push("/login");
            }}
            >
            Login
            </ListGroup.Item>

            <ListGroup.Item
            as="li"
            activeKey="/signup"
            style={{ cursor: "pointer" }}
            onClick={()=>{
              history.push("/signup");
            }}
            >
            Signup
            </ListGroup.Item>
        </>
    )
}

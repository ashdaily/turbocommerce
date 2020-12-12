import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {logout, isLoggedIn} from "../util/Auth";
import axios from "../util/Axios";
import Logo from "../components/Logo";
import CartListedItems from "./CartListedItem";


export default () => {
  let history = useHistory();
  const [productGrandParentCategory, setProductGrandParentCategory] = useState(null);

  useEffect(()=>{
    axios.get("/api/products/product-grand-parent-category/")
    .then(response => {
      if(response.status === 200){
        setProductGrandParentCategory(response.data)
      }
    })
  }, [])

  let categoryNames;

  if(productGrandParentCategory){
    categoryNames = productGrandParentCategory.map((category, index) => (
      <ListGroup.Item
        as="li"
        style={{ cursor: "pointer" }}
        key={index}
      >
        {category.category_name}
      </ListGroup.Item>
    ))
  }

  let logoutOption;

  if(isLoggedIn()){
    logoutOption = (
      <ListGroup.Item
        as="li"
        activeKey="/"
        style={{ cursor: "pointer" }}
        onClick={()=>{
          logout()
          history.push("/login");
        }}
      >
        Logout
      </ListGroup.Item>
    )
  }

  return (
    <>
      <Logo />
      <ListGroup as="ul">
        {logoutOption}
        {categoryNames ? categoryNames : null}
        <CartListedItems />
      </ListGroup>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import axios from "../util/Axios";


export default () => {
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

  return (
    <>
      {categoryNames}
    </>
  );
};

import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import axios from "../util/Axios";
import { useHistory } from "react-router-dom";


export default () => {
  const [productGrandParentCategory, setProductGrandParentCategory] = useState(null);

  useEffect(()=>{
    axios.get("/api/products/categories/")
    .then(response => {
      if(response.status === 200){
        setProductGrandParentCategory(response.data)
      }
    })
  }, [])

  let categoryNames;
  let history = useHistory();

  if(productGrandParentCategory){
    categoryNames = productGrandParentCategory.map((category, index) => (
      <ListGroup.Item
        as="li"
        style={{ cursor: "pointer" }}
        key={index}
        onClick={() => {
          history.push(`/${category.slug}`);
        }}
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

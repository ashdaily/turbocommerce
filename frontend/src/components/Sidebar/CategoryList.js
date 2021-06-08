import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import axios from "../../util/Axios";
import CategoryListItem from "./CategoryListItem";


export default () => {
  const [productGrandParentCategory, setProductGrandParentCategory] = useState(
    null
  );

  useEffect(() => {
    axios.get("/api/products/categories/").then((response) => {
      if (response.status === 200) {
        setProductGrandParentCategory(response.data);
      }
    });
  }, []);

  let categoryNames;
  let history = useHistory();

  if (productGrandParentCategory) {
    categoryNames = productGrandParentCategory.map((category, index) => (
       <CategoryListItem category={category} key={'CategoryListItemTier1'+index}/>
    ));
  }

  return  <ul className={'m-0 p-0'}>{categoryNames}</ul>;
};

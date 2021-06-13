import React, {useEffect, useState} from "react";
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

  if (productGrandParentCategory) {
    categoryNames = productGrandParentCategory.map((category, index) => (
        <CategoryListItem category={category} key={'CategoryListItemTier1' + index}/>
    ));
  }

  return <ul className={'m-0 p-0'}>{categoryNames}</ul>;
};

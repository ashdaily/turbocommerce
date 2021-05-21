import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";

import axios from "../../util/Axios";
import csx from "classnames";
import styles from "./Styles.module.scss";


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
        <li className={csx(styles.active)}>
          <a className={styles.tier1title}
             aria-haspopup="true"
             aria-expanded="false">{category.category_name}</a>
          <div className={styles.tier2}>
            <ul>
          {category.product_parent_categories.map((parentCategory, i) => (
            <>
              <li className={styles.active}>
                <div className={styles.tierTitle} >{parentCategory.category_name}</div>
              </li>
              {parentCategory.product_child_categories.map(
                (childCategory, index) => (
                    <li className={styles.active}>
                      <Link to={`/${category.slug}/${parentCategory.slug}/${childCategory.slug}`} className="anchor-silent" key={index}>
                    {childCategory.category_name}
                      </Link>
                    </li>
                )
              )}
            </>
          ))}
            </ul>
          </div>
        </li>
    ));
  }

  return  <ul >{categoryNames}</ul>;
};

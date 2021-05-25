import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import Paginate from "../components/Paginate";
import axios from "../util/Axios";
import csx from "classnames";

export default () => {
  const { grandParentCategory, parentCategory, childCategory } = useParams();
  const [productData, setProductData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const loadData = () => {
      axios
        .get(
          `/api/products/by-category/?grand_parent_category_slug=${grandParentCategory}&parent_category_slug=${parentCategory}&child_category_slug=${childCategory}&page=${pageNumber}`
        )
        .then((response) => {
          if (response.status === 200) {
            let productData = response.data;
            setProductData(productData);
          }
        });
    };
    loadData();
  }, [childCategory, grandParentCategory, parentCategory, pageNumber]);

  if (productData && !productData.count) {
    return (
      <Row className="p-3 wishlistLogin">
        <Col md={{ span: 12 }}>
          <div className="wishlistLogin-heading">Sorry No Products Found</div>
          <div className="wishlistLogin-info">
            Stay tuned for the new products coming soon
          </div>
          <div className="wishlistLogin-icon">
            <i className="fas fa-shopping-basket"></i>
          </div>
        </Col>
      </Row>
    );
  }

  let paginate;
  let products;
  if (productData) {
    paginate = (
      <Paginate
        size="sm"
        className="mt-3"
        hasNext={productData.next ? true : false}
        hasPrevious={productData.previous ? true : false}
        numPages={productData.count}
        pageNumber={pageNumber}
        setPageNumber={(value) => setPageNumber(value)}
      />
    );
    products = productData.results.map(
      (product, index) =>
        product.product_variants.length > 0 && (
            <ProductCard key={index} data={product} />
        )
    );
  }

  return (
    <>
      <div className={csx('d-flex', 'flex-wrap')}>
        {products}
      </div>
      <Row>
        <Col>{paginate}</Col>
      </Row>
    </>
  );
};

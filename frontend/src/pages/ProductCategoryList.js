import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import Paginate from "../components/Paginate";
import axios from "../util/Axios";

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

  let paginate;
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
  }

  let products;
  if (productData) {
    products = productData.results.map(
      (product, index) =>
        product.product_variants.length > 0 && (
          <Col md={4}>
            <ProductCard key={index} data={product} />
          </Col>
        )
    );
  }

  return (
    <>
      <Row>{products}</Row>
      <Row>
        <Col>{paginate}</Col>
      </Row>
    </>
  );
};

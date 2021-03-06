import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import ProductCard from "../components/ProductCard";
import Paginate from "../components/Paginate";
import axios from "../util/Axios";

export default () => {
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const loadData = () => {
      axios.get(`/api/products/?page=${pageNumber}`).then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      });
    };
    loadData();
  }, [pageNumber]);

  if (!data) {
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
  if (data) {
    paginate = (
      <Paginate
        size="sm"
        className="mt-3"
        hasNext={data.next ? true : false}
        hasPrevious={data.previous ? true : false}
        numPages={data.count}
        pageNumber={pageNumber}
        setPageNumber={(value) => setPageNumber(value)}
      />
    );
    products = data.results.map(
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

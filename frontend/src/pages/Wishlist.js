import React, { useEffect, useState } from "react";
import { isLoggedIn } from "../util/Auth";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

import ProductCard from "../components/ProductCard";
import Paginate from "../components/Paginate";
import axios from "../util/Axios";

const Wishlist = () => {
  const [productData, setProductData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const loadData = () => {
    axios.get(`api/customer/wishlist/`).then((response) => {
      if (response.status === 200) {
        if (response.data.count > 0) {
          let productData = response.data;
          setProductData(productData);
        } else {
          setProductData(null);
        }
      }
    });
  };

  useEffect(() => {
    loadData();
  }, [pageNumber]);

  if (!isLoggedIn) {
    return (
      <Row className="p-3 wishlistLogin">
        <Col md={{ span: 12 }}>
          <div className="wishlistLogin-heading">PLEASE LOG IN</div>
          <div className="wishlistLogin-info">
            Login to view items in your wishlist
          </div>
          <div className="wishlistLogin-icon">
            <i className="far fa-bookmark"></i>
          </div>
          <Link to="login">
            <Button variant="primary" size="lg" block>
              LOGIN
            </Button>
          </Link>
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
          <Col md={4}>
            <ProductCard key={index} data={product} />
          </Col>
        )
    );

    return (
      <>
        <Row>{products}</Row>
        <Row>
          <Col>{paginate}</Col>
        </Row>
      </>
    );
  } else {
    return (
      <Row className="p-3 wishlistLogin">
        <Col md={{ span: 12 }}>
          <div className="wishlistLogin-heading">YOUR WISHLIST IS EMPTY</div>
          <div className="wishlistLogin-info">
            Add items that you like to your wishlist. Review them anytime and
            easily move them to the bag.
          </div>
          <div className="wishlistLogin-icon">
            <i className="far fa-bookmark"></i>
          </div>
          <Link to="/">
            <Button variant="primary" size="lg" block>
              CONTINUE SHOPPING
            </Button>
          </Link>
        </Col>
      </Row>
    );
  }
};

export default Wishlist;

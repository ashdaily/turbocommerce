import React, {useContext, useEffect, useMemo, useState} from "react";
import { isLoggedIn } from "../util/Auth";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import ProductCard from "../components/ProductCard/ProductCard";
import Paginate from "../components/Paginate";
import axios from "../util/Axios";
import csx from "classnames";
import {ShopContext} from "../context/ShopContext";

const Wishlist = () => {
  const [productData, setProductData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { wishlistItems } = useContext(ShopContext);

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

  const wislistItems = useMemo(() => {
    if (productData === null) {
      return [];
    }
    return productData.results.filter((item) => {
      return wishlistItems.findIndex((val) => val.id == item.id) >= 0;
    });
  }, [productData, wishlistItems]);

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
  if (wislistItems.length > 0) {
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
    products = wislistItems.map(
        (product, index) =>
            product.product_variants.length > 0 && (
                <ProductCard key={index} data={product} />
            )
    );

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

import React, { useContext } from "react";
import { isLoggedIn } from "../util/Auth";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { ShopContext } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const { totalWishlistItems, wishlistItems } = useContext(ShopContext);

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

  if (!totalWishlistItems) {
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

  let products;
  if (wishlistItems) {
    products = wishlistItems.map(
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
    </>
  );
};

export default Wishlist;

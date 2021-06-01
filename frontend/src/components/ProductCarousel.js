import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import ProductCard from "./ProductCard/ProductCard";
import Paginate from "./Paginate";
import axios from "../util/Axios";
import csx from "classnames";

const ProductCarousel = (props) => {
  const {startContent} = props;
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const loadData = () => {
      axios
        .get(
          `/api/products/product-suggestion/${props.productId}/?page=${pageNumber}`
        )
        .then((response) => {
          if (response.status === 200) {
            setData(response.data);
          }
        });
    };
    loadData();
  }, [pageNumber, props.productId]);

  let paginate;
  if (data) {
    paginate = (
      <Paginate
        className="mt-3"
        size="sm"
        hasNext={data.next ? true : false}
        hasPrevious={data.previous ? true : false}
        numPages={data.count}
        pageNumber={pageNumber}
        setPageNumber={(value) => setPageNumber(value)}
      />
    );
  }

  let products;
  if (data && data.hasOwnProperty("results")) {
    products = data.results.map(
      (product, index) =>
        product.product_variants.length > 0 && (
            <ProductCard key={index} data={product} />
        )
    );
  }

  if (data && data.count === 0) return null;

  return (
    <>
      {startContent}
      <h5 className={'my-0 ml-3'}>You May Also Like </h5>
      <div className={csx('d-flex', 'flex-wrap')}>
        {products}
      </div>
      <Row>
        <Col>{paginate}</Col>
      </Row>
    </>
  );
};

ProductCarousel.defaultProps = {
  startContent: (<></>)
}

export default ProductCarousel;

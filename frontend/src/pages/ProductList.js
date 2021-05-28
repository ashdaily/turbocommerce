import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import csx from 'classnames';
import ProductCard from "../components/ProductCard/ProductCard";
import Paginate from "../components/Paginate";
import axios from "../util/Axios";
import WaitingComponent from "../components/WaitingComponent/WaitingComponent";
import NoProduct from "../components/NoProduct/NoProduct";

export default () => {
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      axios.get(`/api/products/?page=${pageNumber}`).then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
        setLoading(false);
      });
    };
    loadData();
  }, [pageNumber]);

  if (isLoading) {
    return (
        <WaitingComponent/>
    );
  }

  if (!data) {
    return (
        <NoProduct/>
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

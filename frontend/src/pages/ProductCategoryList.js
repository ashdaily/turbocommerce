import React, {useEffect, useState} from "react";
import {Row, Col} from "react-bootstrap";
import {useParams} from "react-router-dom";

import ProductCard from "../components/ProductCard/ProductCard";
import Paginate from "../components/Paginate";
import axios from "../util/Axios";
import csx from "classnames";
import NoProduct from "../components/NoProduct/NoProduct";

export default () => {
    const {grandParentCategory, parentCategory, childCategory} = useParams();
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
           <NoProduct/>
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
                    <ProductCard key={index} data={product}/>
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

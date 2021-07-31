import React, {useCallback, useEffect, useRef, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import Paginate from "../components/Paginate";
import axios from "../util/Axios";
import csx from "classnames";
import NoProduct from "../components/NoProduct/NoProduct";
import DynamicBreadcrumbs from "../components/DynamicBreadcrumbs";

export default () => {
    const {grandParentCategory, parentCategory, childCategory} = useParams();
    const [productData, setProductData] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const lastPageNumber = useRef(0);

    const generateRequestUrl = useCallback(() => {
        let reqUrl = `/api/products/by-category/`;
        if (grandParentCategory)
            reqUrl += `?grand_parent_category_slug=${grandParentCategory}`;

        if (parentCategory)
            reqUrl += `&parent_category_slug=${parentCategory}`;

        if (childCategory)
            reqUrl += `&child_category_slug=${childCategory}`;

        return `${reqUrl}&page_size=1&page=${pageNumber}`;
    },[grandParentCategory, parentCategory, pageNumber, childCategory]);

    useEffect(() => {
        const loadData = () => {
            axios
                .get(generateRequestUrl())
                .then((response) => {
                    if (response.status === 200) {
                        let tempData = response.data;
                        if (productData && lastPageNumber.current !== pageNumber) {
                            const results = JSON.parse(JSON.stringify(productData.results)).concat(tempData.results);
                            tempData.results = results;
                        }
                        lastPageNumber.current = pageNumber;
                        setProductData(tempData);
                    }
                });
        };
        loadData();
    }, [childCategory, grandParentCategory, parentCategory, pageNumber, generateRequestUrl]);


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
            <DynamicBreadcrumbs/>
            <div className={csx('d-flex', 'flex-wrap')}>
                {products}
            </div>
            <Row>
                <Col>{paginate}</Col>
            </Row>
        </>
    );
};

import React, { useState, useEffect } from "react";
import {Row, Col} from "react-bootstrap";
import ProductCard from "./ProductCard";
import Paginate from "./Paginate";
import axios from "../util/Axios";


export default (props) => {
    const [data, setData] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(()=> {
        const loadData = () => {
            axios.get(`/api/products/product-suggestion/${props.productId}/?page=${pageNumber}`)
            .then(response => {
                if(response.status === 200){
                    setData(response.data)
                }
            })
        }
        loadData()
    }, [pageNumber, props.productId]);

    let paginate;
    if(data){
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
    if(data && data.hasOwnProperty("results")){
        products = data.results.map(
            (product, index) => <Col md={4}><ProductCard key={index} data={product}/></Col>
        )
    }

    if(data && data.count === 0) return null;

    return(
        <>
        <h4> You May Also Like </h4>
        <Row>
            {products}
        </Row>
        <Row>
            <Col>{paginate}</Col>
        </Row>
        </>
    )
}

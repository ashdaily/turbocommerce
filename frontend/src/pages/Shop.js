 import React, { useEffect, useState } from "react"
import { Row, Col} from 'react-bootstrap';

import SideBar from "../components/SideBar";
import ProductCard from "../components/ProductCard";
import Paginate from "../components/Paginate";
import axios from "../util/Axios";

export default ()=>{
    const [data, setData] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(()=> {
        const loadData = () => {
            axios.get(`/api/products/?page=${pageNumber}`)
            .then(response => {
                if(response.status === 200){
                    setData(response.data)
                }
            })
        }
        loadData()
    }, [pageNumber]);

    let paginate;
    if(data){
        paginate = (
            <Paginate
                hasNext={data.next ? true : false}
                hasPrevious={data.previous ? true : false}
                numPages={data.count}
                pageNumber={pageNumber}
                setPageNumber={(value) => setPageNumber(value)}
            />
        );
    }

    let products;
    if(data){
        products = data.results.map((product, index) => <ProductCard key={index} data={product}/>)
    }

    return(
        <>
            <Row>
                <Col md={3}>
                    <SideBar />
                </Col>
                <Col md={9}>
                    <Row>
                       {products}
                    </Row>
                    <Row>
                        <Col>{paginate}</Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

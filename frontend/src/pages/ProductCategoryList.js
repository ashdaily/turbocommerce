import React, { useEffect, useState } from "react"
import { Row, Col} from 'react-bootstrap';

import ProductCard from "../components/ProductCard";
import Paginate from "../components/Paginate";
import axios from "../util/Axios";
import { useParams } from "react-router-dom";


export default ()=>{
	const { cat } = useParams();
    const [data, setData] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(()=> {
        const loadData = () => {
            axios.get(`/api/products/?page=${pageNumber}`)
            .then(response => {
                if(response.status === 200){
                    let productData = response.data
                    productData.results = productData.results.filter((product) => product.child_category.slug === cat)
                    setData(productData)
                }
            })
        }
        loadData()
    }, [cat, pageNumber]);

    let paginate;
    if(data){
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
    }

    let products;
    if(data){
        products = data.results.map(
            (product, index) => 
                product.product_variants.length > 0 && 
                    (<Col md={4}><ProductCard key={index} data={product}/></Col>)
            
            )
    }

    return(
    <>
        <Row>
            {products}
        </Row>
        <Row>
            <Col>{paginate}</Col>
        </Row>
    </>
    )
}

import React from "react"
import { Row, Col} from 'react-bootstrap';

import SideBar from "../components/SideBar";
import ProductCard from "../components/ProductCard";

export default ()=>{
    return(
        <>
            <Row>
                <Col md={3}>
                    <SideBar />
                </Col>
                <Col md={9}>
                    <Row>
                       <ProductCard />
                       <ProductCard />
                       <ProductCard />
                       <ProductCard />
                       <ProductCard />
                       <ProductCard />
                       <ProductCard />
                       <ProductCard />
                    </Row>
                </Col>
            </Row>
        </>
    )
}

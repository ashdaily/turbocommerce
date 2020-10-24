import React, { useState, useEffect } from "react"
import { Row, Col} from 'antd';
import { Card } from 'antd';

import Sider from "../components/Sider";
import ProductCard from "../components/ProductCard";

export default ()=>{
    return(
        <>
            <Row>
                <Col span={5}>
                    <Sider />
                </Col>
                <Col span={19}>
                    <Row>
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
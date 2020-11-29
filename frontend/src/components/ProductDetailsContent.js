import React from "react";
import { Row, Col, Button, Table } from 'react-bootstrap';


export default (props)=> {
    return (
        <Row className="product-details-content mt-5">
            <Col>
                <h5>{props.data.product_name}</h5>
                <Table size="lg">
                    <tbody>
                        <tr>
                            <td>Brand</td>
                            <td>{props.data.brand.brand_name}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{props.data.product_description}</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>Rs. {props.data.unit_price}</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>{props.data.unit_weight_in_grams} g</td>
                        </tr>
                        <tr>
                            <td>Returnable</td>
                            <td>
                            {props.data.returnable ? (<i className="text-success fa fa-check-circle"></i>) : (<i className="text-success fa fa-exclamation-circle"></i>)}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                            {props.data.sizes_available.map(({name}, index)=><Button className="ml-1" variant="outline-info" key={index}>{name}</Button>)}
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <Button variant="light">
                    Add to cart <i className="fa fa-shopping-cart"></i>
                </Button>
            </Col>
        </Row>
    )
}

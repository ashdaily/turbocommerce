import React from "react";
import { Row, Col, Button, Table } from 'react-bootstrap';


export default (props)=> {
    return (
        <Row className="product-details-content mt-5">
            <Col>
                <h5>{props.data.product_name}</h5>
                <Table hover size="lg">
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
                    </tbody>
                </Table>

                <Button variant="light">
                    Add to cart <i class="fa fa-shopping-cart"></i>
                </Button>
            </Col>
        </Row>
    )
}

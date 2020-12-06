import React from "react";
import { Row, Col, Button, Table } from 'react-bootstrap';


export default (props)=> {
    const product_specification = props.data.product_specification.map(({specification_name, specification_value}, index) => {
        return (
            <tr key={index}>
                <td>{specification_name}</td>
                <td>{specification_value}</td>
            </tr>
    )})


    return (
        <Row className="product-details-content">
            <Col>
                <h5>{props.data.product_name}</h5>
                <div className="table-responsive">
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
                                {props.data.sizes_available.map(({name}, index)=><Button className="mr-4" variant="outline-primary" key={index}>{name}</Button>)}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                <Button variant="primary" className="w-100 mt-4">
                    Add to cart <i className="fa fa-shopping-cart"></i>
                </Button>
                <Button variant="danger" className="w-100 mt-3">
                    Add to wishlist <i className="fa fa-heart"></i>
                </Button>

                <h5 className="mt-5">Product Specifications</h5>
                <div className="table-responsive">
                    <Table size="lg">
                        <tbody>
                            {product_specification}
                        </tbody>
                    </Table>
                </div>
            </Col>
        </Row>
    )
}

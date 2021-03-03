import React, { useReducer, useContext } from "react";
import { Row, Col, Button, Table } from 'react-bootstrap';
import ShopContext from '../util/ShopContext'


export default (props)=> {

    const { addToCart } = useContext(ShopContext);

    const initvariant = 0;

    const reducer = (variant, action) => {
        variant = action.index
        return variant
    }

    const [variant, dispatch] = useReducer(reducer, initvariant);

    function addCart(e){
        addToCart(props.data, props.data.product_variants[variant])
    }

    // const product_specification = props.data.product_specification.map(({specification_name, specification_value}, index) => {
    //     return (
    //         <tr key={index}>
    //             <td>{specification_name}</td>
    //             <td>{specification_value}</td>
    //         </tr>
    // )})


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
                                <td>Rs. {props.data.product_variants[variant].price}</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>{props.data.product_variants[variant].weight_in_grams} g</td>
                            </tr>
                            <tr>
                                <td>Returnable</td>
                                <td>
                                {props.data.returnable ? (<i className="text-success fa fa-check-circle"></i>) : (<i className="text-success fa fa-exclamation-circle"></i>)}
                                </td>
                            </tr>
                            <tr>
                                <td>Colors</td>
                                <td>
                                {props.data.product_variants.map(({color, id}, index)=><Button className="mr-2" variant="outline-primary" key={id} size="sm" style={{'background' : color} } onClick={() => dispatch({index : index})} >{color}</Button>)}
                                </td>
                            </tr>
                            <tr>
                                <td>Sizes</td>
                                <td>
                                {props.data.product_variants[variant].sizes_available.map(({name}, index)=><Button className="mr-2" variant="outline-primary" key={index} size="sm">{name}</Button>)}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                <Button variant="primary" className="w-100 mt-4" onClick={addCart}>
                    Add to cart <i className="fa fa-shopping-cart"></i>
                </Button>
                <Button variant="danger" className="w-100 mt-3">
                    Add to wishlist <i className="fa fa-heart"></i>
                </Button>

                <h5 className="mt-5">Product Specifications</h5>
                <div className="table-responsive">
                    <Table size="lg">
                        <tbody>
                            {/* {product_specification} */}
                        </tbody>
                    </Table>
                </div>
            </Col>
        </Row>
    )
}

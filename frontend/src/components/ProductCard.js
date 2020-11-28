import React from "react";
import { Card, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";


export default (props) => {
    return(
        <Col md={3}>
            <Link to={`/${props.data.id}`} className="anchor-silent">
                <Card className="mt-3" class="product-card">
                    <Card.Img variant="top" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                    <Card.Body>
                        <Card.Text className="product-name mb-0">
                            {props.data.product_name}
                        </Card.Text>
                        <Card.Text className="product-price text-bac">
                            <span>Rs.</span> {props.data.unit_price}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    )
}

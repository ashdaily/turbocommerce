import React from "react";
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";


export default (props) => {
    return(
        <Link to={`/${props.data.child_category.parent_category.grand_parent_category.slug}/${props.data.child_category.parent_category.slug}/${props.data.child_category.slug}/${props.data.slug}`} className="anchor-silent">
            <Card className="mt-3 product-card">
                <Card.Img variant="top" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                <Card.Body>
                    <Card.Text className="product-name mb-0">
                        {props.data.product_name}
                    </Card.Text>
                    <Card.Text className="product-price">
                        <span>Rs.</span> {props.data.product_variants[0].price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

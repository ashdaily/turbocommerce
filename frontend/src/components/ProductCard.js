import React from "react";
import { Card } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";


export default (props) => {
	const { grandParentCategory, parentCategory, childCategory } = useParams();
    return(
        <Link to={`/${grandParentCategory}/${parentCategory}/${childCategory}/${props.data.slug}`} className="anchor-silent">
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

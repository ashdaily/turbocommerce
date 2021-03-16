import React from "react";
import { Card } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";


export default (props) => {
	const { grandParentCat, parentCat, cat } = useParams();
    return(
        <Link to={`/${grandParentCat}/${parentCat}/${cat}/${props.data.slug}`} className="anchor-silent">
            <Card className="mt-3 product-card">
                <Card.Img variant="top" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                <Card.Body>
                    <Card.Text className="product-name mb-0">
                        {props.data.product_name}
                    </Card.Text>
                    <Card.Text className="product-price">
                        <span>Rs.</span> {props.data.unit_price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

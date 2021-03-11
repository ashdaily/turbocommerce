import React from "react";
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";


export default (props) => {
    let slug;
    if (props.parentCat) {
        slug = `/${props.parentCat}`
    }
    if (props.cat !== undefined) {
        slug = `${slug}/${props.cat}`
    }
    return(
        <Link to={`${slug}/${props.data.slug}`} className="anchor-silent">
            <Card className="mt-3 product-card">
                <Card.Img variant="top" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                <Card.Body>
                    <Card.Text className="product-name mb-0">
                        {props.data.category_name}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

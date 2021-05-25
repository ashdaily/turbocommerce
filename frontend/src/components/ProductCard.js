import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import csx from 'classnames';

export default (props) => {
  return (
    <Link
      to={`/${props.data.child_category.parent_category.grand_parent_category.slug}/${props.data.child_category.parent_category.slug}/${props.data.child_category.slug}/${props.data.slug}`}
      className={csx('anchor-silent', 'product-cont')}
    >
      <Card className="mx-3 my-3 product-card border-0">
        <Card.Img
          variant="top"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
        <Card.Body className={csx('pl-0', 'mt-3')}>
          <Card.Text className="product-name mb-0">
            {props.data.product_name}
          </Card.Text>
          <Card.Text className="product-price">
            <span>Rs.</span> {props.data.product_variants[0].price}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

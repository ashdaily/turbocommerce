import React, {useEffect, useState} from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import csx from 'classnames';
import ImageSlider from "./ImageSlider";
import ImageLoader from "../ImageLoader/ImageLoader";
import ProductUtils from "../../util/ProductUtils";


export default (props) => {
  const { data } = props;
  const [showSlider, setShowSlider] = useState(false);

  const mouseEnter = () => {
    setShowSlider(true);
  };

  const mouseLeave = () => {
    setShowSlider(false);
  };

  return (
    <Link
      to={`/${props.data.child_category.parent_category.grand_parent_category.slug}/${props.data.child_category.parent_category.slug}/${props.data.child_category.slug}/${props.data.slug}`}
      className={csx('anchor-silent', 'product-cont')}
    >
      <Card onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className="mx-3 my-3 product-card border-0">
        <div className={'product-image-container'}>
          {showSlider ? <ImageSlider images={ProductUtils.getImageArray(data)}/> : <ImageLoader className={'product-img'} src={ProductUtils.getFrontImage(data)} alt=""/>}
        </div>
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

import React, {useContext, useMemo, useState} from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import csx from 'classnames';
import ImageSlider from "./ImageSlider";
import ImageLoader from "../ImageLoader/ImageLoader";
import ProductUtils from "../../util/ProductUtils";
import {ShopContext} from "../../context/ShopContext";

export default (props) => {
  const { data } = props;
  const { storeInfo } = useContext(ShopContext);
  const [showSlider, setShowSlider] = useState(false);

  const mouseEnter = () => {
    setShowSlider(true);
  };

  const mouseLeave = () => {
    setShowSlider(false);
  };

  const imagesArr = useMemo(() => {
    return ProductUtils.getImageArray(data)
  }, [data]);

  const productFirstImage = useMemo(() => {
    return ProductUtils.getFrontImage(data);
  }, [data]);

  return (
    <Link
      to={`/${props.data.child_category.parent_category.grand_parent_category.slug}/${props.data.child_category.parent_category.slug}/${props.data.child_category.slug}/${props.data.slug}`}
      className={csx('anchor-silent', 'product-cont')}
    >
      <Card onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className="mx-3 my-3 product-card border-0">
        <div className={'product-image-container'}>
          {imagesArr.length > 1 ? (showSlider ?
              <ImageSlider images={imagesArr}/> : <ImageLoader className={'product-img'} src={productFirstImage} alt=""/>)
              :
              (<ImageLoader className={'product-img'} src={productFirstImage} alt=""/>)
          }
        </div>
        <Card.Body className={csx('pl-0', 'mt-3')}>
          <Card.Text className="product-name mb-0">
            {props.data.product_name}
          </Card.Text>
          <Card.Text className="product-price">
            <span>{storeInfo.default_currency}</span> {props.data.product_variants[0].price}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

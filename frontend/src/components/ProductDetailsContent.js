import React, {useContext, useReducer} from "react";
import {Col, Row, Table} from "react-bootstrap";
import ColorSwatch from "./ColorSwatch";
import Sizes from "./Sizes";
import AddToCartButton from "./AddToCartButton";
import {ShopContext} from "../context/ShopContext";
import Wishlist from "./Wishlist/Wishlist";

const ProductDetailsContent = ({data}) => {
  const {storeInfo} = useContext(ShopContext);
  const initvariant = 0;

  const reducer = (variant, action) => {
    variant = action.index;
    return variant;
  };

  const variantColor = Array.from(
      new Set(data.product_variants.map((variant) => variant.color))
  ).map((color) => {
    return {
      color: color,
      id: data.product_variants.find((item) => item.color === color).id,
    };
  });

  const initColor = variantColor[0].color;

  const initVariantSizes = data.product_variants.filter(
      (variant) => variant.color === initColor
  );

  const initsize = data.product_variants.find(
      (item) => item.color === initColor
  ).size.name;

  const changeSize = (size, action) => {
    size = action.size;
    return size;
  };

  const changeColor = (color, action) => {
    color = action.color;
    return color;
  };

  const changeVariantSizes = (variantSizes, action) => {
    variantSizes = action.variantSizes;
    return variantSizes;
  };

  const [variant, dispatchSwatch] = useReducer(reducer, initvariant);
  const [size, dispatchSize] = useReducer(changeSize, initsize);
  const [color, dispatchColor] = useReducer(changeColor, initColor);
  const [variantSizes, dispatchVariantSizes] = useReducer(
      changeVariantSizes,
      initVariantSizes
  );

  const product_specification = data.product_variants[variant].product_variant_specifications.map(
      ({specification_name, specification_value}, index) => {
        return (
            <tr key={index}>
              <td>{specification_name}</td>
              <td>{specification_value}</td>
            </tr>
        );
      }
  );

  const handleSwatchColor = (color) => {
    dispatchColor({
      color: color,
    });
    let newSizes = data.product_variants.filter(
        (variant) => variant.color === color
    );
    dispatchVariantSizes({
      variantSizes: newSizes,
    });
    dispatchSize({
      size: newSizes[0].size.name,
    });
    let index = data.product_variants.findIndex(
        (variant) =>
            variant.color === color && variant.size.name === newSizes[0].size.name
    );
    dispatchSwatch({
      index: index,
    });
  };

  const handleSwatchSize = (size) => {
    dispatchSize({
      size: size,
    });
    let index = data.product_variants.findIndex(
        (variant) => variant.color === color && variant.size.name === size
    );
    dispatchSwatch({
      index: index,
    });
  };

  return (
      <Row className="product-details-content">
        <Col>
          <h1 className={'product-name'}>{data.product_name}</h1>
          <div className="table-responsive">
            <Table size="lg">
              <tbody>
              <tr>
                <td>Brand</td>
                <td>{data.brand.brand_name}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{data.product_description}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>{storeInfo.default_currency} {data.product_variants[variant].price}</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>
                  {data.product_variants[variant].weight_in_grams}&nbsp; g
                </td>
              </tr>
              <tr>
                <td>Returnable</td>
                <td>{data.returnable ? "Yes" : "No"}</td>
              </tr>
              <ColorSwatch
                  variants={data.product_variants}
                  onClick={(color) => handleSwatchColor(color)}
                  active={color}
                  colors={variantColor}
              />
              <Sizes
                  sizes={variantSizes}
                  onClick={(size) => handleSwatchSize(size)}
                  size={size}
              />
              </tbody>
            </Table>
          </div>
          <div className={'product-detail-action'}>
            <AddToCartButton data={data} variant={data.product_variants[variant]}/>
            <Wishlist data={data}/>
          </div>
          <h5 className="mt-5">Product Specifications</h5>
          <div className="table-responsive">
            <Table size="lg">
              <tbody>{product_specification}</tbody>
            </Table>
          </div>
        </Col>
      </Row>
  );
};

export default ProductDetailsContent;

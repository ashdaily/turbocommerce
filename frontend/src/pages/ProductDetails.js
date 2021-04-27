import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";

import "react-image-gallery/styles/css/image-gallery.css";
import DynamicBreadcrumbs from "../components/DynamicBreadcrumbs";
import axios from "../util/Axios";
import ProductDetailsContent from "../components/ProductDetailsContent";
import ProductCarousel from "../components/ProductCarousel";

export default () => {
  const { slug } = useParams();

  const images = [
    {
      original:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/8198853/2019/2/8/d39a011b-7a37-4efd-8e18-17dbec8bb54b1549609138270-Levis-Men-Blue--Black-Slim-Fit-Checked-Casual-Shirt-35154960-1.jpg",
      thumbnail:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/8198853/2019/2/8/d39a011b-7a37-4efd-8e18-17dbec8bb54b1549609138270-Levis-Men-Blue--Black-Slim-Fit-Checked-Casual-Shirt-35154960-1.jpg",
    },
    {
      original:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/8198853/2019/2/8/76ff1f0f-89f3-4854-b8bf-527ec8aeb01e1549609138248-Levis-Men-Blue--Black-Slim-Fit-Checked-Casual-Shirt-35154960-2.jpg",
      thumbnail:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/8198853/2019/2/8/76ff1f0f-89f3-4854-b8bf-527ec8aeb01e1549609138248-Levis-Men-Blue--Black-Slim-Fit-Checked-Casual-Shirt-35154960-2.jpg",
    },
  ];
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = () => {
      axios.get(`/api/products/?slug=${slug}`).then((response) => {
        if (response.status === 200) {
          setData(response.data.results[0]);
        }
      });
    };
    loadData();
  }, [slug]);

  if (!data) return null;
  if (data.product_variants.length === 0) return null;
  return (
    <Row>
      <Col>
        {/* Breadcrumbs */}
        <Row>
          <Col md={7}>
            <DynamicBreadcrumbs />
          </Col>
        </Row>

        {/* Product images & Specs */}
        <Row>
          <Col md={{ span: 7 }}>
            <ImageGallery
              items={images}
              lazyLoad={true}
              thumbnailPosition="left"
              showPlayButton={false}
            />
            <Row className="mt-5">
              <Col md={12}>
                <ProductCarousel productId={data.id} />
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <ProductDetailsContent data={data} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";

import "react-image-gallery/styles/css/image-gallery.css";
import DynamicBreadcrumbs from "../components/DynamicBreadcrumbs";
import axios from "../util/Axios";
import ProductDetailsContent from "../components/ProductDetailsContent";
import ProductCarousel from "../components/ProductCarousel";
import WaitingComponent from "../components/WaitingComponent/WaitingComponent";
import ProductUtils from "../util/ProductUtils";

export default () => {
  const { slug } = useParams();

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      axios.get(`/api/products/?slug=${slug}`).then((response) => {
        if (response.status === 200) {
          setData(response.data.results[0]);
          setLoading(false);
        }
      });
    };
    loadData();
  }, [slug]);

  if (isLoading) {
    return (
        <WaitingComponent/>
    );
  }

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
              items={ProductUtils.getProductDetailSliderImages(data)}
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

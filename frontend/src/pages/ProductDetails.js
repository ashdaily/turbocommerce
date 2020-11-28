import React from "react";
import { Row, Col,  Breadcrumb } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import { useParams } from "react-router-dom";

import SideBar from "../components/SideBar";
import "react-image-gallery/styles/css/image-gallery.css";
import DynamicBreadcrumbs from "../components/DynamicBreadcrumbs";


export default () => {
    const { id } = useParams();

    const images = [
        {
          original: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/8198853/2019/2/8/d39a011b-7a37-4efd-8e18-17dbec8bb54b1549609138270-Levis-Men-Blue--Black-Slim-Fit-Checked-Casual-Shirt-35154960-1.jpg',
          thumbnail: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/8198853/2019/2/8/d39a011b-7a37-4efd-8e18-17dbec8bb54b1549609138270-Levis-Men-Blue--Black-Slim-Fit-Checked-Casual-Shirt-35154960-1.jpg',
        },
        {
          original: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/8198853/2019/2/8/76ff1f0f-89f3-4854-b8bf-527ec8aeb01e1549609138248-Levis-Men-Blue--Black-Slim-Fit-Checked-Casual-Shirt-35154960-2.jpg',
          thumbnail: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/8198853/2019/2/8/76ff1f0f-89f3-4854-b8bf-527ec8aeb01e1549609138248-Levis-Men-Blue--Black-Slim-Fit-Checked-Casual-Shirt-35154960-2.jpg',
        }
    ]

    return(
        <Row>
            <Col md={2}>
                <SideBar />
            </Col>
            <Col md={5}>
                <Row>
                  <Col>
                    <DynamicBreadcrumbs />
                  </Col>
                </Row>
                <ImageGallery
                  items={images}
                  lazyLoad={true}
                  thumbnailPosition="left"
                  showPlayButton={false}
                />
            </Col>
        </Row>
    )
}

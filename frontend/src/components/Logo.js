import React, {useContext, useEffect} from "react";

import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import logoImage from "../images/logo.png";
import {ShopContext} from "../context/ShopContext";

export default () => {
    const { storeInfo } = useContext(ShopContext);

    //  TODO: REMOVE logoImage once the storeInfo has valid image from backend

  return (
    <Link to="/" className="anchor-silent">
      <Image
        src={logoImage}
        roundedCircle
        alt="logo-coco-rose"
        style={{ height: "10rem" }}
        className="mx-auto d-block"
      />
    </Link>
  );
};

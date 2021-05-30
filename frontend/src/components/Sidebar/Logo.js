import React, {useContext, useEffect} from "react";

import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import logoImage from "../../images/logo.png";
import {ShopContext} from "../../context/ShopContext";

export default () => {
    const { storeInfo } = useContext(ShopContext);

  return (
    <Link to="/" className="anchor-silent">
      <Image
        src={storeInfo.logo}
        roundedCircle
        alt={storeInfo.title_tag}
        className="mx-auto d-block"
      />
    </Link>
  );
};

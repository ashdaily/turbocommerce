import React from "react";

import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import logoImage from "../images/logo.png";

export default () => {
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

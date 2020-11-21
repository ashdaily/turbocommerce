import React from "react";
import { Image } from "react-bootstrap";
import logoImage from "../images/logo.png";


export default () => {
    return(
        <Image
            src={logoImage}
            rounded
            alt="logo-coco-rose"
            style={{height: "10rem"}}
            className="mx-auto d-block"
        />
    )
}

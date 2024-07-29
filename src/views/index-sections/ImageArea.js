/*!

=========================================================
* Paper Kit React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function ImageArea(props) {
  return (
    <>
      {/* <Col className="mr-auto" md="3" sm="3"> */}
      <Col className="mr-auto" md="3" sm="3">
        <h6 className="images-title">{props.tlt}</h6>
        <img
          alt="..."
          className="img-thumbnail img-responsive"
          // src={require("assets/img/faces/erik-lucatero-2.jpg")}
          src={props.image_src}
        />
        <p className="text-center">{props.desc}</p>
      </Col>
    </>
  );
}

export default ImageArea;

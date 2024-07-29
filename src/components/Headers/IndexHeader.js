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
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function IndexHeader() {
  return (
    <>
      <div
        className="page-header section-dark"
       /* 구름 이미지
        style={{
          backgroundImage:
            "url(" + require("assets/img/antoine-barres.jpg") + ")",
        }} 
        */
      >
        <div className="filter" />
        <div className="content-center">

          {/* _examples.scss 파일. .page-header의 min-height: 20vh; max-height: 999px;로 배경 조정*/}

          <Container>
            <div className="title-brand">
              {/* <h1 className="presentation-title">망곰 월드</h1> */}
              <h1 className="presentation-title">ANY PROJECT</h1>
              {/* 안개
              <div className="fog-low">
                <img alt="..." src={require("assets/img/fog-low.png")} />
              </div> 
              */}

              {/* 안개2       
              <div className="fog-low right">
                <img alt="..." src={require("assets/img/fog-low.png")} />
              </div> 
              */}

            </div>
            
            {/* 소제목 */}
            <h2 className="presentation-subtitle text-center">
              desc. 어떤 프로젝트
            </h2> 

          </Container>
        </div>
        
        {/* moving-clouds         
        <div
          className="moving-clouds"
          style={{
            backgroundImage: "url(" + require("assets/img/clouds.png") + ")",
          }}
        /> */}

        {/*             
        <h6 className="category category-absolute">
          Designed and coded by{" "}
          <a
            href="https://www.creative-tim.com?ref=pkr-index-page"
            target="_blank"
          >
            <img
              alt="..."
              className="creative-tim-logo"
              src={require("assets/img/creative-tim-white-slim2.png")}
            />
          </a>
        </h6> 
        */}

      </div>
    </>
  );
}

export default IndexHeader;

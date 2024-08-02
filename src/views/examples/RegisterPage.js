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
import React, { useState } from "react";
import axios from "axios";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";


// core components
// import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ExamplesNavbar from "components/Navbars/IndexNavbar.js";

function RegisterPage() {

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');
  const [nicknameError, setNicknameError] = useState('');

   // 유효성 검사를 통과하는지 여부를 저장하는 상태
   const [isFormValid, setIsFormValid] = useState(false);

   React.useEffect(() => {
    // 모든 유효성 검사를 통과해야 버튼을 활성화
    const isValid = !emailError && !passwordError && !passwordCheckError && !nicknameError;
    setIsFormValid(isValid && email && password && passwordCheck && nickname);
  }, [emailError, passwordError, passwordCheckError, email, password, passwordCheck, nickname, nicknameError]);

  const validateEmail = (value) => {
    // 이메일 유효성 검사 (간단한 예제)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? '' : '이메일 형식이 맞지 않습니다.';
  };

  const validatePassword = (value) => {
    // 비밀번호 유효성 검사 (예: 최소 6자 이상)
    return value.length >= 6 ? '' : '비밀번호는 최소 6자 이상이어야 합니다.';
  };

  const validatePasswordCheck = (value) => {
    // 비밀번호 확인 유효성 검사
    return value === password ? '' : '비밀번호가 일치하지 않습니다.';
  };

  const validateNickname = (value) => {
    // 비밀번호 확인 유효성 검사
    return value.length >= 2 ? '' : '닉네임은 두 글자 이상이어야 합니다.';
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordError(validatePassword(value));
    // 비밀번호 확인도 실시간으로 검사
    setPasswordCheckError(validatePasswordCheck(passwordCheck));
  };

  const handlePasswordCheckChange = (e) => {
    const { value } = e.target;
    setPasswordCheck(value);
    setPasswordCheckError(validatePasswordCheck(value));
  };

  const handleNicknameChange = (e) => {
    const { value } = e.target;
    setNickname(value);
    setNicknameError(validateNickname(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 최종 유효성 검사 및 제출 로직
    if (!emailError && !passwordError && !passwordCheckError && !nicknameError) {
      // 폼 제출 로직
      console.log('Form submitted');
      // post일 경우 파라미터가 없을 경우 null 삽입
      axios.post("http://localhost:8080/api/user", {
        nickname: nickname,
        userEmail: email,
        userPw : password
      })
      .then(function (response) {
          alert('성공!');
          console.log(response.data);
        }).catch(function (error) {
          console.log(error);
        }).then(function() {
        });
    }
  };

  // 유효성 검사 정리
  function isValidation() {

  }


  return (
    <>
      <ExamplesNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">회원가입</h3>
                <div className="social-line text-center">
                  <Button
                    className="btn-neutral btn-just-icon mr-1"
                    color="facebook"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-facebook-square" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon mr-1"
                    color="google"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-google-plus" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon"
                    color="twitter"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-twitter" />
                  </Button>
                </div>
                
                {/* 회원 가입 정보 입력 */}
                <Form className="register-form" onSubmit={handleSubmit}>
                  
                  <label>닉네임</label>
                  <Input placeholder="nickname." type="text" value={nickname} onChange={handleNicknameChange} required/>
                  {nicknameError && <p className="error-message">{nicknameError}</p>}

                  {/* 이메일 */}
                  <label>Email</label>
                  <Input placeholder="Email" type="email" value={email} onChange={handleEmailChange} required/>
                  {emailError && <p className="error-message">{emailError}</p>}

                  {/* 비밀번호 */}
                  <label>Password</label>
                  <Input placeholder="Password" type="password" value={password} onChange={handlePasswordChange} required/>
                  {passwordError && <p className="error-message">{passwordError}</p>}

                  {/* 비밀번호 확인 */}
                  <label>Password Check</label>
                  <Input placeholder="Password Check" type="password" value={passwordCheck} onChange={handlePasswordCheckChange} required/>
                  {passwordCheckError && <p className="error-message">{passwordCheckError}</p>}

                  <Button block className="btn-round" color="danger" type="submit" disabled={!isFormValid}>
                    Register
                  </Button>

                </Form>
                
                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    비밀번호 찾기
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by Creative Tim
          </h6>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;

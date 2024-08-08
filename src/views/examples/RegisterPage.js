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
import { useNavigate } from 'react-router-dom';

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col, Modal } from "reactstrap";


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

  // 회원 가입 완료 모달
  const [modal, setModal] = React.useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const navigate = useNavigate(); 

  const handleRegComplete = () => {
    setModal(!modal);
    navigate('/'); // 메인 페이지로. 추후 로그인 페이지로 업데이트 예정

  }

  // 회원 가입 활성화
  const [isActivate, setIsActivate] = useState(false);

  const [userForm, setUserForm] = useState({
    nickname : '',
    userEmail : '',
    userPw : '',
    passwordCheck : '',
  });

  const [isWarning, setIsWarning] = useState({
    nickname: {
      isValid: false,
      warningMsg: ''
    },
    userEmail: {
      isValid: false,
      warningMsg: ''
    },
    userPw: {
      isValid: false,
      warningMsg: ''
    },
    passwordCheck: {
      isValid: false,
      warningMsg: ''
    }
  });

  React.useEffect(() => {
    if (isWarning.nickname.isValid && 
        isWarning.userEmail.isValid && 
        isWarning.userPw.isValid && 
        isWarning.passwordCheck.isValid) {
      setIsActivate(true);
    } else {
      setIsActivate(false);
    }
  }, [
    isWarning.nickname.isValid,
    isWarning.userEmail.isValid,
    isWarning.userPw.isValid,
    isWarning.passwordCheck.isValid
  ]);

  // 닉네임 핸들러
  const handlerNicknameChange = (e) => {

    // 이미 사용중인 닉네임입니다. 검사를 실시간으로 넣어주자.
    // 이메일도 마찬가지.
    
    const targetValue = e.target.value;
    setUserForm({...userForm, nickname : targetValue});
    
    // 빈 값일 때
    if(targetValue.length === 0) {
      setIsWarning({...isWarning, nickname : {isValid : false, warningMsg : ''}});
    
    // 두 글자 미만일 때
    } else if(2 > targetValue.length) {
      setIsWarning({...isWarning, nickname : {isValid : false, warningMsg : '닉네임은 최소 두 글자 이상이어야 합니다.'}});
    
    // 그 외 허용
    } else {
      axios.get(`http://localhost:8080/api/user/check-nickname/${targetValue}`)
      .then(function (response) {
        if(response.data === true) {
          // 해당 닉네임이 이미 존재합니다.
          setIsWarning({...isWarning, nickname : {isValid : false, warningMsg : '이미 사용중인 닉네임입니다.'}});
        } else {
          // 사용 가능한 닉네임입니다.
          setIsWarning({...isWarning, nickname : {isValid : true, warningMsg : '사용 가능한 닉네임입니다.'}});
        }
      })
      .catch(function (error) {
        setIsWarning({...isWarning, nickname : {isValid : false, warningMsg : '에러 발생'}});
      })
      .then(function() {
        // Optional additional actions
      });
    }
  }

  // 이메일 핸들러
  const handlerEmailChange = (e) => {

    const targetValue = e.target.value;
    const exp = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;

    setUserForm({...userForm, userEmail : targetValue});
    
    if(targetValue.length === 0) {
      setIsWarning({...isWarning, userEmail : {isValid : false, warningMsg : ''}});
    } else if(!exp.test(targetValue)) {
      setIsWarning({...isWarning, userEmail : {isValid : false, warningMsg : '이메일 형식이 올바르지 않습니다.'}});
    } else {

      axios.get(`http://localhost:8080/api/user/check-userEmail/${targetValue}`)
      .then(function (response) {
        if(response.data === true) {

          setIsWarning({...isWarning, userEmail : {isValid : false, warningMsg : '이미 사용중인 이메일입니다.'}});

        } else {

          setIsWarning({...isWarning, userEmail : {isValid : true, warningMsg : '사용 가능한 이메일입니다.'}});

        }
      })
      .catch(function (error) {
        setIsWarning({...isWarning, nickname : {isValid : false, warningMsg : '에러 발생'}});
      })
      .then(function() {
        // Optional additional actions
      });
    }
    
  }
  
  // 비밀번호 핸들러
  const handlerPasswordChange = (e) => {

    const targetValue = e.target.value;

    //영어소문자+숫자+특수문자(_,-)+글자수(6글자 이상, 16글자 이하)
    const exp = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;

    setUserForm({...userForm, userPw : targetValue});
    
    // 상태 업데이트가 비동기적으로 처리되기 때문에, 
    // 하나의 setIsWarning 호출이 이전의 상태를 덮어쓰는 경우가 발생할 수 있음. 
    // 이를 방지하기 위해 두 번의 상태 업데이트를 하나의 함수로 합칠 필요가 있음.
    let newWarnings = { ...isWarning };

    if(targetValue.length === 0) {
      newWarnings = {...newWarnings, userPw : {isValid : false, warningMsg : ''}};
    } else if(!exp.test(targetValue)) {
      newWarnings = {...newWarnings, userPw : {isValid : false, warningMsg : '비밀번호는 6~20자 이하의 영문자, 숫자, 특수 문자를 포함해야 합니다.'}};
    } else {
      newWarnings = {...newWarnings, userPw : {isValid : true, warningMsg : ''}};
    }

    // 비밀번호 확인 영역 검사
    // 비밀번호와 비밀번호 확인 값이 같아야 함.
    if(userForm.passwordCheck.length !== 0 && targetValue !== userForm.passwordCheck) {
      newWarnings = {...newWarnings, passwordCheck : {isValid : false, warningMsg : '비밀번호가 일치하지 않습니다.'}};
    } else if(userForm.passwordCheck.length !== 0 && targetValue === userForm.passwordCheck){
      newWarnings = {...newWarnings, passwordCheck : {isValid : true, warningMsg : ''}};
    }

    setIsWarning(newWarnings);
    

  }    

  // 비밀번호 확인 핸들러
  const handlerPasswordCheckChange = (e) => {

    const targetValue = e.target.value;
    setUserForm({...userForm, passwordCheck : targetValue});

    if(targetValue.length === 0) {
      setIsWarning({...isWarning, passwordCheck : {isValid : false, warningMsg : ''}});
    } else if(userForm.userPw !== targetValue) {
      setIsWarning({...isWarning, passwordCheck : {isValid : false, warningMsg : '비밀번호가 일치하지 않습니다.'}});
    } else {
      setIsWarning({...isWarning, passwordCheck : {isValid : true, warningMsg : ''}});
    }
    
  } 

  // 회원 가입
  const handleSubmit = (e) => {
      
      e.preventDefault();

      // post일 경우 파라미터가 없을 경우 null 삽입
      axios.post("http://localhost:8080/api/user", {
        nickname: userForm.nickname,
        userEmail: userForm.userEmail,
        userPw : userForm.userPw
      })
      .then(function (response) {
        
          // 초기화
          setUserForm({nickname:'', userEmail:'', userPw:'', passwordCheck:''});
          setIsWarning({
            nickname: { isValid: false, warningMsg: '' },
            userEmail: { isValid: false, warningMsg: '' },
            userPw: { isValid: false, warningMsg: '' },
            passwordCheck: { isValid: false, warningMsg: '' }
           });

          console.log(response.data);
          toggleModal();
        }).catch(function (error) {
          alert(error.response.data.message);
          console.log(error.response.data);
        }).then(function() {
        });
  };

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
                  
                  <label>Nickname</label>
                  <Input placeholder="nickname" type="text" value={userForm.nickname} onChange={handlerNicknameChange} maxLength={8} required/>
                  {isWarning.nickname.warningMsg && <p className="error-message">{isWarning.nickname.warningMsg}</p>}

                  {/* 이메일 */}
                  <label>Email</label>
                  <Input placeholder="Email" type="email" value={userForm.userEmail} onChange={handlerEmailChange} required/>
                  {isWarning.userEmail.warningMsg && <p className="error-message">{isWarning.userEmail.warningMsg}</p>}

                  {/* 비밀번호 */}
                  <label>Password</label>
                  <Input placeholder="Password" type="password" value={userForm.userPw} onChange={handlerPasswordChange} maxLength={20} required/>
                  {isWarning.userPw.warningMsg && <p className="error-message">{isWarning.userPw.warningMsg}</p>}

                  {/* 비밀번호 확인 */}
                  <label>Password Check</label>
                  <Input placeholder="Password Check" type="password" value={userForm.passwordCheck} onChange={handlerPasswordCheckChange} maxLength={20} required/>
                  {isWarning.passwordCheck.warningMsg && <p className="error-message">{isWarning.passwordCheck.warningMsg}</p>}

                  <Button block className="btn-round" color="danger" type="submit" disabled={!isActivate}>
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


        <Modal isOpen={modal} toggle={toggleModal}>
          <div className="modal-header">
            <button
              aria-label="Close"
              className="close"
              type="button"
              onClick={toggleModal}
            >
              <span aria-hidden={true}>×</span>
            </button>
            <h5
              className="modal-title text-center"
              id="exampleModalLabel"
            >
              알림
            </h5>
          </div>
          <div className="modal-body">
            회원 가입이 완료되었습니다.
          </div>
          <div className="modal-footer">
            <div className="right-side">
              <Button className="btn-link" color="danger" type="button" onClick={handleRegComplete}>
                OK
              </Button>
            </div>
          </div>
        </Modal>




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

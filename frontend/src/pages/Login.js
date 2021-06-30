import React, {useRef, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {toast} from "react-toastify";
import Constants from '../config/constants';
import {saveTokens} from "../util/Auth";
import axios from "../util/Axios";
import SocialButton from "../components/SocialButton";
import "../css/login.scss";

export default () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [validated, setValidated] = useState(false);
  const toastRef = useRef(false);

  const handleSocialLogin = (user) => {
    console.log(user);
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  function handleForm(e) {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const payload = {
      email: email,
      password: password,
    };
    axios
        .post("api/core/auth/token/", payload)
        .then((response) => {
          if (response.status === 200) {
            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;
            saveTokens(accessToken, refreshToken);
            setRedirect(true);
            // FIXME: confirm is there is a better way to do this
            window.location.reload();
          }
        })
        .catch((error) => {
          if (error.response.data.detail) {
            if (!toastRef.current) {
              toast.error(error.response.data.detail, {
                autoClose: 2000,
              });
              toastRef.current = true;
              setTimeout(() => {
                toastRef.current = false;
              }, 2000);
            }
          }
        });
  }

  const form = (
      <Row className={'loginCont'}>
        <Col md={{span: 5}}>
          <img style={{width: '100%'}} src={require('../assets/images/ic_login.svg')}/>
        </Col>
        <Col md={{span: 6, offset: 1}}>
          <div className="loginBox">
            <h2>Login</h2>
            <Form noValidate validated={validated} onSubmit={handleForm}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      toastRef.current = false;
                    }}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      toastRef.current = false;
                    }}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a password.
                </Form.Control.Feedback>
              </Form.Group>
              <div className={'loginBtnCont'}>
                <Button variant="primary" type="submit" className={'loginBtn'} block>
                  Login
                </Button>
              </div>
            </Form>
            <center className="center-line">
              <span>OR</span>
            </center>
            <SocialButton
                className="gmail-btn mt-2"
                provider="google"
                appId={Constants.GOOGLE_LOGIN_KEY}
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
            >
              <img src="/google.svg" alt="Google Icon"/> Login with Google
            </SocialButton>
            <SocialButton
                variant="primary"
                className="facebook-btn mt-2"
                provider="facebook"
                appId={Constants.FACEBOOK_KEY}
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
            >
              <i className="fa fa-facebook-square"></i> Login with Facebook
            </SocialButton>
          </div>
        </Col>
      </Row>
  );

  if (redirect) return <Redirect to="/"/>;

  return form;
};

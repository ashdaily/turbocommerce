import React, { useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import axios from "../util/Axios";

export default () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [agree, setAgree] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);

  function handleForm(e) {
    setError(null);
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
      .post("api/core/customer/signup/", payload)
      .then((response) => {
        if (response.status === 201) {
          setRedirect(true);
        }
      })
      .catch((error) => {
        setError(error.response.data);
      });
  }

  const form = (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Card title="Login" className="p-3 mt-5">
          <Form noValidate validated={validated} onSubmit={handleForm}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please choose a email.
              </Form.Control.Feedback>
              {error ? (
                <Form.Text className="text-danger">
                  {error.email[0]}
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a password.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="I agree with all terms and conditions."
                onChange={(e) => setAgree(e.target.checked)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!agree}>
              Sign up
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );

  if (redirect) return <Redirect to="/" />;

  return form;
};

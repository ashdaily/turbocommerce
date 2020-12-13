import React, { useState } from "react";
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { saveTokens } from "../util/Auth";
import axios from "../util/Axios";


export default ()=>{
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [validated, setValidated] = useState(false);

    function handleForm(e){
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return
        }

        const payload = {
            "username": email,
            "password": password
        }
        axios.post("api/core/auth/token/",  payload)
        .then(response => {
            if(response.status === 200){
                const accessToken = response.data.access;
                const refreshToken = response.data.refresh;
                saveTokens(accessToken, refreshToken);
                setRedirect(true);
                // FIXME: confirm is there is a better way to do this
                window.location.reload()
            }
        })
        .catch(error => {
            console.error(error)
        })
    }

    const form = (
        <Row>
            <Col md={{span: 6, offset:3}}>
                <Card title="Login" className="p-3 mt-5">
                    <Form noValidate validated={validated} onSubmit={handleForm}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                            Please choose a email.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                            Please choose a password.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Card>
            </Col>
        </Row>
    )

    if(redirect) return <Redirect to="/" />;

    return form;
}

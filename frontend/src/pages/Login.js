import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Checkbox, Card } from 'antd';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
// import { GoogleAuth } from 'react-social-auth';
import FacebookLogin from 'react-facebook-login';
import { Redirect } from "react-router-dom";
import axios from "../util/Axios";


export default ()=>{
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [redirect, setRedirect] = useState(false);

    // let GoogleAuthButton = ({ onClick }) => (
    //         <Button type="primary" block onClick={onClick}>
    //             Login with Gmail
    //             <GoogleOutlined />
    //         </Button>
    //     )

    function onBasicSignIn(){
        const payload = {
            "grant_type" : "password",
            "client_id": process.env.REACT_APP_DJANGO_OAUTH_GENERATED_CLIENT_ID,
            "client_secret": process.env.REACT_APP_DJANGO_OAUTH_GENERATED_CLIENT_SECRET,
            "username": email,
            "password": password
        }

        axios.post("auth/token/",  payload);
    }

    function onSocialSignIn(authPayload ){
        // clear localStorage FIXME: this is bad
        localStorage.clear();

        // make payload
        let backend;
        let token;
        let grant_type = "convert_token";
        if(authPayload.type === "google"){
            backend = "google-oauth";
            token = authPayload.authResponse.token;
        }else{
            backend = "facebook";
            token = authPayload.accessToken
        }
        const payload = {
            "grant_type" : grant_type,
            "backend" : backend,
            "client_id": process.env.REACT_APP_DJANGO_OAUTH_GENERATED_CLIENT_ID,
            "client_secret": process.env.REACT_APP_DJANGO_OAUTH_GENERATED_CLIENT_SECRET,
            "token": token
        }

        /*
            send convert token request to django social auth
            & then set localStorage
        */
        axios.post("auth/convert-token/", payload)
        .then(response => {
            console.log(response)
            localStorage.setItem("accessToken", response.data["access_token"]);
            localStorage.setItem("backendName", backend);

            if(response.status === 200){
                setRedirect(true);
            }

        })
    }

    const form = (
        <>
            <Row>
                <Col span={6} offset={9}>
                    <Card title="Login" >
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            >
                            {/* <Form.Item>
                                <GoogleAuth
                                    appId={process.env.REACT_APP_GOOGLE_APP_ID}
                                    onSuccess={onSocialSignIn}
                                    component={GoogleAuthButton}
                                />
                            </Form.Item> */}
                            <Form.Item>
                                <FacebookLogin
                                    appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                                    autoLoad={false}
                                    fields="name,email"
                                    callback={onSocialSignIn}
                                    cssClass="ant-btn ant-btn-primary facebook-btn"
                                    icon = {<FacebookOutlined />}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                                onChange={e => setEmail(e.target.value)}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                onChange={e => setPassword(e.target.value)}
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" onClick={onBasicSignIn}>
                                Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    )

    if(redirect) return <Redirect to="/shop" />;

    return form;
}

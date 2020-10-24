import React from "react";
import { Row, Col, Form, Input, Button, Checkbox, Card } from 'antd';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import { GoogleAuth } from 'react-social-auth'


export default ()=>{
    const onFinish = values => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    

    let GoogleAuthButton = ({ onClick }) => (
            <Button type="primary" block onClick={onClick}>
                Login with Gmail
                <GoogleOutlined />
            </Button>
        )
    

    let onSignIn = authPayload => {
        // Use the authentication payload to verify
        // the identity of the request using server
        // side authentication procedures.
        console.log(authPayload)
    }

    const form = (
        <>
            <Row>
                <Col span={6} offset={9}>
                    <Card title="Login" >
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            >
                            <Form.Item>
                                <GoogleAuth
                                    appId={process.env.REACT_APP_GOOGLE_APP_ID}
                                    onSuccess={onSignIn}
                                    component={GoogleAuthButton}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" block>
                                    Login with Gmail
                                    <FacebookOutlined />
                                </Button>
                            </Form.Item>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    )
    return form;
}

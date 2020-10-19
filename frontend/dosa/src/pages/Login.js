import React from "react";
import { Row, Col, Form, Input, Button, Checkbox, Card } from 'antd';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';


export default ()=>{
    const onFinish = values => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    
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
                                <Button type="default" block>
                                    Login with Facebook
                                    <FacebookOutlined />
                                </Button>
                            </Form.Item>
                           
                            <Form.Item>
                                <Button type="primary" block>
                                    Login with Gmail
                                    <GoogleOutlined />
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

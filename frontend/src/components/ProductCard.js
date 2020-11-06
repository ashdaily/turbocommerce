import React, { useState, useEffect } from "react";
import { Rate, Card, Col } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default ()=>{
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setInterval(()=>{
            setLoading(false)
        }, 1000)
    }, [])

    return(
        <Col span={6}>
            <Card
                loading={loading}
                hoverable
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <Meta title="Europe Street beat" description="www.instagram.com" />
                <Rate character={<HeartOutlined />} count={1}/>
            </Card>
        </Col>
    )
}

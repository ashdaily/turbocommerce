import React, { useState, useEffect } from "react";
import { Button, Card, Col } from 'react-bootstrap';

export default ()=>{
    return(
        <Col md={3}>
            <Card className="mt-3">
                <Card.Img variant="top" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                <Card.Body>
                <Card.Title>Bla bla</Card.Title>
                <Card.Text>
                Bla bla
                </Card.Text>
                <Button variant="primary">Add to cart</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

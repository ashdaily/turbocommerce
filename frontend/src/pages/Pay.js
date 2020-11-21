import React from "react"
import { Row, Col} from 'react-bootstrap';

import SideBar from "../components/SideBar";


export default ()=>{
    return(
        <>
            <Row>
                <Col md={3}>
                    <SideBar />
                </Col>
                <Col md={9}>
                    <h1>Pay here</h1>
                </Col>
            </Row>
        </>
    )
}

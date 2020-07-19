import React from "react";
import {Error} from "../../Components/error/error"
import {Link} from "react-router-dom"
import { Col, Row } from 'react-bootstrap';

export default function PageNotFound(props) {
    return (
        <Row>
            <Col className="col-sm-4"/>
            <Col className="col-sm-4">
                <Error msg={null} />
                <h2>Oops! This Page Could Not Be Found</h2>
                <div style={{display:"flex"}}><Link style={{margin:"0 auto"}} className="btn btn-danger" to="/home">Go To Homepage</Link></div>
            </Col>
            <Col className="col-sm-4"/>
        </Row>
    )
}
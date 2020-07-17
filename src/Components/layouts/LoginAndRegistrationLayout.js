import React from "react";
import {Container, Row, Col,} from 'react-bootstrap';

export const LoginAndRegistrationLayout = (props) => {

    let style = {
        'width': '100%',
        'height': '100%',
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'display': 'flex',
        'alignItems': 'center',
        "justifyContent": 'center',
        'overflow': 'auto',
    };

    return (
        <Container style={{
            backgroundImage: `url(https://directlinedev.com/media/services/service/background/background_11.wide.jpeg)`,
            height: '100vh'
        }} fluid={true}>
            <Row>
                <Col/>
                <Col style={style}>{props.children}</Col>
                <Col/>
            </Row>
        </Container>
    )

};
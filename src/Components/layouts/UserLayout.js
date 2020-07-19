import React from "react";
import { Container, Row } from 'react-bootstrap';
import withAuthentication from '../../hoc/withAuthentication'
import Header from "../header/header"

class UserLayout extends React.Component{

    render() {
        return (
            <Container fluid={true}>
                <Row style = {{display:'block'}}>
                   <Header/>
                </Row>
                {this.props.children}
            </Container>
        )
    }


}

const condition = authUser => authUser;

export default withAuthentication(condition)(UserLayout);

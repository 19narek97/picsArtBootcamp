import React from "react";
import {Form, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import BtnSignOut from "../btnSignOut/BtnSignOut"

export const Header = () => {
    return (
        <Navbar bg="light" expand='md'>
            <Navbar.Brand href="#home">PicsArt BoothCamp</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link style={{marginTop:'6px'}} to={"/home"}>Home</Link>
                </Nav>
                <Form inline>
                    <BtnSignOut/>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}
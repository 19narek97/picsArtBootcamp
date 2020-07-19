import React from "react";
import {Form, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import BtnSignOut from "../btnSignOut/BtnSignOut"
import classes from "./header.module.css"
import {Urls} from "../../constants"
import {withRouter} from "react-router";


const Header = (props) => {
    const links = (navbar) => {
        return navbar.map((el) => {
            let style = {};
            if(props.location.pathname === el.url){
                style.color = "#a673e7"
            }

            return (
                <Link className={`${classes["links"]}`} key={el.id} style={{marginTop:'6px',marginLeft:"8px",...style}} to={el.url}>{el.name}</Link>
            )
        })
    }

    return (
        <Navbar bg="light" expand='md'>
            <Navbar.Brand href="#home">  <Link to={"/home"}><span style={{color:"#3fe4fd"}}>PicsArt</span> <span style={{color:"#a166e4"}}>BoothCamp</span></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {links(Urls)}
                </Nav>
                <Form inline>
                    <BtnSignOut/>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(Header)
import React from "react";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";
import {connect} from "react-redux";
import {logOut} from "../../store/actions/user"

const BtnSignOut = (props) => {

    const logOut =  () => {
        console.log("click",localStorage.getItem("token"))
        props.logoutUser(localStorage.getItem("token"),props.history.push)
    };

    return (
        <Button onClick={logOut} variant="danger">
            Log Out
        </Button>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: (token,historyPush) => dispatch(logOut(token,historyPush)),
    }
};

export default withRouter(connect(null,mapDispatchToProps)(BtnSignOut));
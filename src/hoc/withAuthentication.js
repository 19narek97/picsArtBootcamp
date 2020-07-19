import React from "react";
import {connect} from 'react-redux'
import {onAuthUser} from "../store/actions/user"
import { Redirect } from "react-router-dom";

const withAuthentication = condition => Component => {
    class WithAuthentication extends React.Component {

        constructor(props) {
            super(props);
            this.userToken = localStorage.getItem('token');
            console.log(this.userToken)
            this.props.onAuthUser(this.userToken);

        }

        componentDidMount() {
            this.props.onAuthUser(this.userToken);
        }

        render() {
            if(this.props.isLoading){
                return null;
            }

            let token = localStorage.getItem("token")

            return condition(token) ? (
                <Component {...this.props} />
            ) :  <Redirect to={'/'}/>;
        }

    }

    const mapStateToProps = (state) => {
        return {
            userInfo: state.user.user,
            isLoading: state.user.isLoading,
            hasError: state.user.error,
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return{
            onAuthUser: token => dispatch(onAuthUser(token))
        }
    };

    return connect(mapStateToProps,mapDispatchToProps)(WithAuthentication)

}

export default withAuthentication;



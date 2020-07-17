import React from "react";
import {Formik,ErrorMessage,Field,Form} from "formik";
import * as Yup from 'yup'
import {Link} from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import {loginUser} from "../../store/actions/user";
import {connect} from "react-redux"

class Login extends React.Component{

    handelClickLogin = (fields) => {
        this.props.login(fields,this.props.history.push)
    };

    render() {
        let {isLoading,hasError} = this.props;
        return (
            <>
                <Formik
                    initialValues={{
                        email:"",
                        password:""
                    }}
                    validationSchema={Yup.object({
                        email:Yup.string().email('Email is invalid').required('Email is required'),
                        password: Yup.string()
                            .min(6, 'Password must be at least 6 characters')
                            .required('Password is required'),
                    })}
                    onSubmit={fields => {
                        this.handelClickLogin(fields)
                    }}
                >
                    {
                        ({errors, status, touched, values, setFieldValue }) => (
                            <Form>
                                {hasError ? <Alert key={'qwerty'} variant='danger'>
                                    You entered an incorrect email or password, please try again
                                </Alert> : null}
                                <div className="form-row">
                                    <div className="form-group col-12">
                                        <Field  placeholder="Email"
                                                name="email" type="text"
                                                className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}/>
                                        <ErrorMessage name="email" component="div" style={{'fontSize':'20px'}} className="invalid-feedback"/>
                                    </div>
                                    <div className="form-group col-12">
                                        <Field placeholder="Password"
                                               name="password" type="password"
                                               className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}/>
                                        <ErrorMessage name="password" component="div" style={{'fontSize':'20px'}} className="invalid-feedback"/>
                                    </div>
                                </div>
                                <div style={{'display':'flex'}} className="form-group">
                                    <button disabled={isLoading} style={{'margin': 'auto'}} type="submit" className="btn btn-primary ">Login</button>
                                </div>
                                <div>
                                    <p style={{color:"white",'textAlign': 'center'}}>If you do not have a profile you can register? <Link to={"/registration"}>Sign up</Link></p>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </>
        )
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
    return {
        login: (user,historyPush) => dispatch(loginUser(user,historyPush))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
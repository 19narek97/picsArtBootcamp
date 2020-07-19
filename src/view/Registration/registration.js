import React from "react";
import {Formik, ErrorMessage, Field, Form} from "formik";
import * as Yup from 'yup'
import {Spin, Alert} from 'antd';
import {WithUserContextFireBase} from "../../firebase";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import {connect} from "react-redux"
import {fetchDataCompanies} from "../../store/actions/registration"
import {Error} from "../../Components/error/error"
import {Link, Redirect} from "react-router-dom";
import axios from "../../utils/request";
import {notification} from "antd";

class Registration extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: {hasError: false, msg: null},
            isLoadingRequest: false
        }
    }

    componentDidMount() {
        this.props.fetchCompanies()
    }

    handelRegistration = (values) => {
        let {email, firstName, lastName, sex, jsExperience, companyId, reactExperience, password, date} = values,
            errorMsg = {},
            user = {email, firstName, lastName, sex, jsExperience, companyId, reactExperience, password},
            month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth(),
            day = date.getDate() + 1 + 1 < 10 ? "0" + (date.getDate() + 1) : date.getDate(),
            birthDate = date.getFullYear() + "-" + month + "-" + day;

        this.props.fireBase.storage.ref("avatars").child(`${new Date().getTime()}`).put(values.avatarUrl).then((snap) => {
            snap.ref.getDownloadURL().then((downloadURL) => {
                user.avatarUrl = downloadURL;
                user.birthDate = birthDate;

                axios.post('api/v1/users/register', {...user}).then((response) => {
                    if (response.status !== 200) {
                        errorMsg.hasError = true;
                        errorMsg.msg = "Please try again, request was not sent successfully";
                        this.setState({error: {...errorMsg}})
                    }
                    return response;
                }).then((data) => this.props.history.push("/")).catch((err) => {
                    errorMsg.hasError = true;
                    errorMsg.msg = "Please try again, you could not register";
                    this.setState({error: {...errorMsg}});
                    notification.warning({
                        message: `Notification`,
                        description: 'Please try again, request was not sent successfully',
                        placement: "topRight",
                    });
                })

            });
        });
    }

    onChangePicture = (e, setField) => {
        let reader = new FileReader(),
            file = e.target.files[0];

        reader.onloadend = () => {
            setField("avatarUrl", file)
        };
        reader.readAsDataURL(file);
    }

    render() {
        let {companies, isLoading, hasError} = this.props,
            {isLoadingRequest, error} = this.state,
            token = localStorage.getItem("token");


        if (token) {
            return <Redirect to={'/home'}/>
        }

        if (isLoading) {
            return <Spin/>
        }

        if (hasError) {
            return (
                <Error msg="Sorry we couldn't load companies."/>
            )
        }

        return (
            <>
                {error.hasError ?
                    <Alert key={'error'} variant='danger'>
                        {error.msg}
                    </Alert> : null}

                <Formik
                    initialValues={{
                        email: "",
                        firstName: "",
                        lastName: "",
                        sex: "male",
                        date: new Date(),
                        jsExperience: "",
                        companyId: 1,
                        avatarUrl: "",
                        reactExperience: "",
                        password: "",
                        confirmPassword: "",

                    }}
                    validationSchema={Yup.object({
                        email: Yup.string().email('Email is invalid').required('Email is required'),
                        firstName: Yup.string().required('First name is required'),
                        lastName: Yup.string().required('Last name is required'),
                        avatarUrl: Yup.string().required('Avatar is required'),
                        jsExperience: Yup.number().required('Js Experience name is required'),
                        companyId: Yup.number().required('Company name is required'),
                        reactExperience: Yup.number().required('React Experience name is required'),
                        password: Yup.string()
                            .min(6, 'Password must be at least 6 characters')
                            .required('Password is required'),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Passwords must match')
                            .required('Confirm Password is required'),
                    })}
                    onSubmit={fields => {
                        this.handelRegistration(fields)
                    }}
                >
                    {
                        ({errors, status, touched, values, setFieldValue}) => (
                            <Form>
                                <div className="form-row">
                                    <div className="form-group col-6">
                                        <Field placeholder="First Name" name="firstName" type="text"
                                               className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')}/>
                                        <ErrorMessage style={{'fontSize': '15px'}} name="firstName" component="div"
                                                      className="invalid-feedback"/>
                                    </div>
                                    <div className="form-group col-6">
                                        <Field name="lastName" type="text" placeholder="Last Name"
                                               className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')}/>
                                        <ErrorMessage style={{'fontSize': '15px'}} name="lastName" component="div"
                                                      className="invalid-feedback"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <Field name="email" type="text" placeholder="Email"
                                           className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}/>
                                    <ErrorMessage name="email" style={{'fontSize': '15px'}} component="div"
                                                  className="invalid-feedback"/>
                                </div>
                                <div className="form-row">
                                    <div className="form-group ml-3 col  ">
                                        <select name="sex"
                                                onChange={sex => setFieldValue('sex', sex.currentTarget.value)}
                                                className={'browser-default custom-select form-check-input ' + (errors.sex && touched.sex ? ' is-invalid' : '')}>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                        <ErrorMessage style={{'fontSize': '15px'}} name="sex"/>
                                    </div>
                                    <div className="form-group mt-1 col  ">
                                        <DatePicker
                                            selected={values.date}
                                            dateFormat="MMMM d, yyyy"
                                            className="form-control"
                                            name="date"
                                            onChange={date => setFieldValue('date', date)}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-6">
                                        <Field placeholder="Js Experience" name="jsExperience" type="number"
                                               className={'form-control' + (errors.jsExperience && touched.jsExperience ? ' is-invalid' : '')}/>
                                        <ErrorMessage style={{'fontSize': '15px'}} name="jsExperience" component="div"
                                                      className="invalid-feedback"/>
                                    </div>
                                    <div className="form-group col-6">
                                        <Field name="reactExperience" type="number" placeholder="React Experience"
                                               className={'form-control' + (errors.reactExperience && touched.reactExperience ? ' is-invalid' : '')}/>
                                        <ErrorMessage style={{'fontSize': '15px'}} name="reactExperience"
                                                      component="div" className="invalid-feedback"/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-6 mt-2">
                                        <input
                                            name="reactExperience"
                                            type="file"
                                            id="inputGroupFile01"
                                            className={'custom-file-input browser-default custom-select form-check-input ' + (errors.avatarUrl && touched.avatarUrl ? ' is-invalid' : '')}
                                            aria-describedby="inputGroupFileAddon01"
                                            onChange={(e) => this.onChangePicture(e, setFieldValue)}
                                        />
                                        <label className="custom-file-label" htmlFor="inputGroupFile01">
                                            Choose Image
                                        </label>
                                        <ErrorMessage style={{'fontSize': '15px'}} name="avatarUrl" component="div"
                                                      className="invalid-feedback"/>
                                    </div>
                                    <div className="form-group col-6">
                                        <div className="form-group ml-2  col  ">
                                            <select name="companyId"
                                                    onChange={companyId => setFieldValue('companyId', companyId.currentTarget.value)}
                                                    className={'browser-default custom-select form-check-input ' + (errors.companyId && touched.companyId ? ' is-invalid' : '')}>
                                                {
                                                    companies.map((el) => <option defaultChecked={true}
                                                                                  key={Math.random()}
                                                                                  value={+el.id}>{el.name}</option>)
                                                }
                                            </select>
                                            <ErrorMessage style={{'fontSize': '15px'}} name="companyId" component="div"
                                                          className="invalid-feedback"/>
                                        </div>
                                        <ErrorMessage style={{'fontSize': '15px'}} name="companyId" component="div"
                                                      className="invalid-feedback"/>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col">
                                        <Field name="password" type="password" placeholder="Password"
                                               className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}/>
                                        <ErrorMessage style={{'fontSize': '15px'}} name="password" component="div"
                                                      className="invalid-feedback"/>
                                    </div>
                                    <div className="form-group col">
                                        <Field name="confirmPassword" type="password" placeholder="Confirm Password"
                                               className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')}/>
                                        <ErrorMessage name="confirmPassword" component="div"
                                                      style={{'fontSize': '15px'}}
                                                      className="invalid-feedback"/>
                                    </div>
                                </div>
                                <div style={{'display': 'flex'}} className="form-group">
                                    <div style={{'margin': 'auto'}}>
                                        <button disabled={isLoadingRequest} type="submit"
                                                className="btn btn-primary mr-2 ">Send
                                        </button>
                                        <button type="reset" disabled={isLoadingRequest}
                                                className="btn btn-secondary">Reset
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p style={{color: "white", 'textAlign': 'center'}}>If you have a profile do not need
                                        to register <Link to={"/"}>Sign in</Link></p>
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
        companies: state.registration.companies,
        isLoading: state.registration.isLoading,
        hasError: state.registration.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCompanies: () => dispatch(fetchDataCompanies())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(WithUserContextFireBase(Registration))




import React from "react";
import Modal from "antd/es/modal";
import {withRouter} from "react-router";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import DatePicker from "react-datepicker"

class UpdateUserProfileForm extends React.Component{


    onClose = () => {
        const {onClose} = this.props;
        onClose()
    }

    onSubmitModal = (values) => {
        let {date} = values,
            month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth(),
            day = date.getDate() + 1 + 1 < 10 ? "0" + (date.getDate() + 1) : date.getDate();
        values.birthDate = date.getFullYear() + "-" + month + "-" + day;
        delete values.date;
        this.props.onSubmit(values)
    }


    render() {
        let {match, entry} = this.props,
            {action} = match.params,
            isVisible = /^(settings)$/i.test(action);

        return (
            <Modal
                title={"Change Settings Profile"}
                width={486}
                visible={isVisible}
                footer={null}
                onCancel={this.onClose}
            >
                <Formik
                    enableReinitialize
                    initialValues={{
                        firstName: entry.firstName,
                        lastName: entry.lastName,
                        sex: entry.sex,
                        date: new Date(entry.birthDate),
                        jsExperience: entry.jsExperience,
                        reactExperience: entry.reactExperience,
                    }}
                    validationSchema={
                        Yup.object({
                            firstName: Yup.string().required('First name is required'),
                            lastName: Yup.string().required('Last name is required'),
                            jsExperience: Yup.number().required('Js Experience name is required'),
                            reactExperience: Yup.number().required('React Experience name is required'),
                        })
                    }
                    onSubmit={fields => {
                        this.onSubmitModal(fields)
                    }}
                >

                    {
                        ({errors, status, touched, values, setFieldValue }) => (
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
                                <div className="form-row">
                                    <div className="form-group ml-3 col">
                                        <Field as="select" name="sex"
                                                onChange={sex => setFieldValue('sex', sex.currentTarget.value)}
                                                className={'browser-default custom-select form-check-input ' + (errors.sex && touched.sex ? ' is-invalid' : '')}>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </Field>
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



                                <div style={{'display':'flex'}} className="form-group">
                                    <div  style={{'margin': 'auto'}}>
                                        <button  type="submit"  className="btn btn-primary mr-2 ">Save</button>
                                        <button  onClick={this.onClose} className="btn btn-secondary">Cancel</button>
                                    </div>
                                </div>
                            </Form>
                        )

                    }
                </Formik>
            </Modal>
        )
    }
}

export default withRouter(UpdateUserProfileForm)
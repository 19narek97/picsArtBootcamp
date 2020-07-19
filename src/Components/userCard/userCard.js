import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Spin} from 'antd';

export class UserCard extends React.Component{


    getCurrentDate = (date) => {
        return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
    }

    openSettings = () => {
        this.props.onModalOpen()
    }

    openUploadImage = () => {
        this.props.onUploadImage()
    }


    render() {
        let {firstName, lastName, sex,avatarUrl, birthDate} = this.props.userInfo,
            {isLoading} = this.props;
        return (
            <>
                { !isLoading ?
                    <Card style={{ width: '20rem',marginTop:"10px"}} >
                        <Card.Img variant="top" src={avatarUrl}  />
                        <Card.Body>
                            <Card.Title>{firstName} {lastName}</Card.Title>
                            <Card.Text>
                                Gender: {typeof sex === "string" ? <strong>{sex.toUpperCase()}</strong> : null} <br/>
                                Date: {typeof birthDate === "string" ? <strong>{this.getCurrentDate(birthDate)}</strong> : null}
                            </Card.Text>
                            <Button variant="primary" onClick={this.openUploadImage}>
                                Upload Image
                            </Button>

                            <Button variant="danger" onClick={this.openSettings} className='float-right' >
                                Settings
                            </Button>

                        </Card.Body>
                    </Card>  : <Spin/>
                }

            </>
        )
    }
}
import React from "react";
import {Row, Col} from 'react-bootstrap';
import {UserCard} from "../../Components/userCard/userCard"
import {connect} from "react-redux"
import UpdateUserProfileForm from "./UpdateUserProfileForm"
import {updateProfile} from "../../store/actions/user";
import UploadPicture from "./uploadPicture"
import {WithUserContextFireBase} from "../../firebase";
import { Skeleton } from 'antd';
import Teams from "./teams";


class Home extends React.Component{


    onModalSubmit = (user) => {
        let token = localStorage.getItem("token");
        this.props.updateProfile({...user},token,this.props.history.push)
    }

    onUploadPicture = (avatarUrl) => {
        let token = localStorage.getItem("token");
        this.props.fireBase.storage.ref("avatars").child(`${new Date().getTime()}`).put(avatarUrl).then((snap) => {
            snap.ref.getDownloadURL().then( (downloadURL) => {
                this.props.updateProfile({avatarUrl:downloadURL},token,this.props.history.push)
            });
        });

    }

    onModalOpen = (url) => {
        this.props.history.push(url)
    }

    onModalClose = () => {
        this.props.history.push("/home")
    }

    onClickTabs = (key) => {
        console.log(key);
    }


    render() {
        let {userInfo,isLoading} = this.props;

        return (
            <>
                <UpdateUserProfileForm entry={{...userInfo}} onClose={this.onModalClose} onSubmit={this.onModalSubmit}/>
                <UploadPicture close={this.onModalClose} onSend={this.onUploadPicture}/>
                <Row>
                    {
                        isLoading ? <Skeleton active /> :
                            <>
                                <Col className='col-sm-3 mt-2'>
                                    <UserCard isLoading={this.props.isLoading} onUploadImage={() => this.onModalOpen("home/uploadImage")} onModalOpen={() => this.onModalOpen("home/settings")} userInfo={userInfo}/>
                                </Col>
                                <Col className="col-sm-9 mt-2" >
                                    <Teams onClickTabs={this.onClickTabs} />
                                </Col>
                            </>
                    }

                </Row>
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
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (data,token,push) => dispatch(updateProfile(data,token,push))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithUserContextFireBase(Home))


import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {withRouter} from "react-router";
import PreviewPicture from "../../Components/previewPicture/previewPicture"

class UploadPicture extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            picture:null,
            pictureUrl:null
        }
    }

    displayPicture = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                picture:file,
                pictureUrl:reader.result
            })
        };
        reader.readAsDataURL(file);
    };

    sendImage = () => {
        return this.props.onSend(this.state.picture)
    }

    render() {
        let {match} = this.props,
            {action} = match.params,
            isVisible = /^(uploadImage)$/i.test(action);

        return(
            <Modal show={isVisible} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group">
                        <PreviewPicture pictureUrl={this.state.pictureUrl}/>
                        <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupFileAddon01">
                      Upload
                    </span>
                        </div>
                        <div className="custom-file">
                            <input
                                type="file"
                                className="custom-file-input"
                                id="inputGroupFile01"
                                aria-describedby="inputGroupFileAddon01"
                                onChange={this.displayPicture}
                            />
                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                                Choose file
                            </label>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.sendImage}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default withRouter(UploadPicture)
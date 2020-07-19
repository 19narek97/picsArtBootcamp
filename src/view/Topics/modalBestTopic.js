import React from "react";
import Modal from "antd/es/modal";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {ListGroup} from "react-bootstrap";

class ModalBestTopic extends React.Component{


    listBestTopics = (topics) => {
       let sortTopics = topics.sort((a, b) => parseFloat(b.votingsCount) - parseFloat(a.votingsCount));
       return  sortTopics.map((el,index) => {
            return (
                <ListGroup.Item key={index}>{`${index + 1}.${el.title}`} <span className="float-right">Vote: <strong>{el.votingsCount}</strong> </span></ListGroup.Item>
            )
        })
    }

    onClose = () => {
        const {onClose} = this.props;
        onClose()
    }

    render() {
        let {match,topics} = this.props,
            {action} = match.params,
            isVisible = /^(bestTopic)$/i.test(action);

        return (
            <Modal
                title={"Best Topics"}
                width={486}
                visible={isVisible}
                footer={null}
                onCancel={this.onClose}
            >
                <ListGroup variant="flush">
                    {this.listBestTopics([...topics])}
                </ListGroup>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        topics: state.topics.topics,
    }
}


export default connect(mapStateToProps,null)(withRouter(ModalBestTopic))
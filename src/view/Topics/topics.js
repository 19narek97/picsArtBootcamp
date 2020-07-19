import React from "react";
import {Row,Col} from "react-bootstrap";
import classes from "./topics.module.css"
import {fetchDataTopics,votedByMe,addTopic,deleteTopic} from "../../store/actions/topics";
import {connect} from "react-redux";
import ListTopics from "./listTopics"
import ModalBestTopic from "./modalBestTopic"

class Topics extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            textInput:""
        }
    }

    componentDidMount() {
        this.props.fetchTopics()
    }

    voted = (topic) => {
        let type = !topic.votedByMe ? "like" : "unlike";
        this.props.votedMe(topic.id,type)
    }

    onCloseModal = () => {
        this.props.history.push("/topics")
    }

    handelChangeInput = (e) => {
        e.preventDefault();
        e.persist();
        this.setState({
            textInput:e.target.value
        })
    }

    addTopic = (title) => {
        this.props.addedTopic(title);
        this.setState({
            textInput:""
        })
    }

    onDeleteTopic = (id) => {
        this.props.deleteTopic(id);
    }

    onKeyboardPress = (e) => {
        if (e.key === 'Enter') {
            this.addTopic(this.state.textInput)
        }
    }

    render() {
        let {topics,isLoading} = this.props,
            {textInput} = this.state;

        return (
            <Row>
                <Col/>
                <Col>
                    <ModalBestTopic onClose={this.onCloseModal}/>
                    <div className={`${classes["not-done"]} ${classes["todolist"]}`}>
                        <h1 style={{color:'#4097fc'}} align="center">Topics</h1>
                        <span style={{display:"flex"}}>
                            <input onKeyPress={this.onKeyboardPress} type="text" className={`${classes["add-todo"]} form-control`} onChange={this.handelChangeInput} value={textInput} placeholder="Add topic"/>
                            <button onClick={() => this.addTopic(textInput)} className="btn ml-2 btn-success">Add</button>
                             <button onClick={() => this.props.history.push("topics/bestTopic")} className="btn ml-2 btn-info">Best</button>
                        </span>
                        <hr/>
                        <ListTopics onDeleteTopic={this.onDeleteTopic} isLoading={isLoading} votedMe={this.voted} list={topics}/>
                    </div>
                </Col>
                <Col/>
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        topics: state.topics.topics,
        isLoading: state.topics.isLoading,
        hasError: state.topics.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTopics: () => dispatch(fetchDataTopics()),
        votedMe: (id,likeOrUnlike) => dispatch(votedByMe(id,likeOrUnlike)),
        addedTopic:(title) => dispatch(addTopic(title)),
        deleteTopic:(id) => dispatch(deleteTopic(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topics)
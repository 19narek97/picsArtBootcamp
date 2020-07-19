import React from "react";
import {fetchDataProjects,voteProject} from "../../store/actions/projects";
import {connect} from "react-redux";
import ListProjects from "./listProjects";

class Projects extends React.Component{


    componentDidMount() {
        this.props.fetchDataProjects()
    }

    vote = (project) => {
        let type = !project.votedByMe ? "like" : "unlike";
        this.props.voteProject(project.id,type)
    }

    render() {
        let {projects} = this.props;
        return (
            <div>
                <h1 style={{color:'#4097fc'}} align="center">Projects</h1>
                <ListProjects votedMe={this.vote} list={projects}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.projects.projects,
        isLoading: state.projects.isLoading,
        hasError: state.projects.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDataProjects: () => dispatch(fetchDataProjects()),
        voteProject: (id,likeOrUnlike) => dispatch(voteProject(id,likeOrUnlike)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Projects)
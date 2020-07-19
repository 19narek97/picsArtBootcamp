import React from "react";
import {Tabs} from "antd";
import {fetchDataTeams} from "../../store/actions/teams";
import {connect} from "react-redux";
import { List } from 'antd';

const { TabPane } = Tabs;

class Teams extends React.Component{

    componentDidMount() {
        this.props.fetchDataTeams()
    }

    handelClickTabs = (key) => {
        let {onClickTabs} = this.props;
        onClickTabs(key)
    }

    renderContentTabs = (members) => {
       return <List
            itemLayout="horizontal"
            dataSource={members}
            renderItem={member => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<img alt="avatarImage" width="50" height="50" src={member.avatarUrl} />}
                        title={<span>{member.firstName + " " + member.lastName}</span>}
                    />
                </List.Item>
            )}
        />
    }

    renderListTeams = (teams) => {
        return teams.map((team) => {
            return (
                <TabPane tab={team.project} key={team.id}>
                    <h1 style={{color:'#4097fc'}} align="center">{team.name}</h1>
                    <span className="float-right mb-5" style={{fontWeight:"bold",fontSize:"15px"}} ><strong>Topic:</strong>{team.topic}</span>
                    {this.renderContentTabs(team.members)}
                </TabPane>
            )
        })
    }

    render() {
        let {teams} = this.props;
        return(
            <Tabs defaultActiveKey="1" onChange={this.handelClickTabs}>
                {this.renderListTeams(teams)}
            </Tabs>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        teams: state.teams.teams,
        isLoading: state.teams.isLoading,
        hasError: state.teams.error,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDataTeams: () => dispatch(fetchDataTeams())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teams)
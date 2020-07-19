import {combineReducers} from "redux"
import RegistrationReducer from "./registration"
import UserReducerr from "./user"
import TopicReducer from "./topicReducer"
import ProjectsReducer from "./projectsReducer"
import TeamsReducer from "./teamsReducer"

const rootReducer = combineReducers({
    registration:RegistrationReducer,
    user:UserReducerr,
    topics:TopicReducer,
    projects:ProjectsReducer,
    teams:TeamsReducer,
})

export default rootReducer;
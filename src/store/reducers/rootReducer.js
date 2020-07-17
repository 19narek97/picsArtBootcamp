import {combineReducers} from "redux"
import RegistrationReducer from "./registration"
import UserReducerr from "./user"

const rootReducer = combineReducers({
    registration:RegistrationReducer,
    user:UserReducerr
})

export default rootReducer;
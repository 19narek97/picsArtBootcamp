import {GET_USER,LOADING_DATA,ERROR,UPDATE_PROFILE} from "../actionTypes/user"

const initialState = {
    user: {

    },
    isLoading: false,
    error: false
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state, user: {...action.payload}
            };
        case LOADING_DATA:
            return {
                ...state,isLoading:action.payload
            };
        case UPDATE_PROFILE:
            return {
                ...state,user:{...state.user,...action.payload}
            };
        case ERROR:
            return {
                ...state,error:action.payload
            };
        default:
            return state
    }
}

export default UserReducer;

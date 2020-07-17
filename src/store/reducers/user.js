import {GET_USER,LOADING_DATA,ERROR} from "../actionTypes/user"

const initialState = {
    user: {},
    isLoading: false,
    error: false
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state, userInfo: {...action.payload}
            };
        case LOADING_DATA:
            return {
                ...state,isLoading:action.payload
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

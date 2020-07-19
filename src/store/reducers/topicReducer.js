import {ERROR, GET_TOPICS, LOADING_TOPICS} from "../actionTypes/topics";

const initialState = {
    topics: [],
    isLoading: false,
    error: false
}

const TopicReducer = (state = initialState,action) => {
    switch (action.type) {
        case GET_TOPICS:
            return {
                ...state,topics:[...action.payload]
            };
        case LOADING_TOPICS:
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

export default TopicReducer;
import {GET_COMPANIES,LOADING_DATA,ERROR} from "../actionTypes/registration"

const initialState = {
    companies: [],
    isLoading:false,
    error:false
}

const RegistrationReducer = (state = initialState,action) => {
    switch (action.type) {
        case GET_COMPANIES:
            return {
                ...state,companies:[...action.payload]
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

export default RegistrationReducer;
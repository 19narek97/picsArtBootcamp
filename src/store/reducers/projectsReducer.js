import {ERROR, GET_PROJECTS, LOADING_PROJECTS} from "../actionTypes/projects";

const initialState = {
    projects: [],
    isLoading: false,
    error: false
}

const ProjectsReducer = (state = initialState,action) => {
    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,projects:[...action.payload]
            };
        case LOADING_PROJECTS:
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

export default ProjectsReducer;
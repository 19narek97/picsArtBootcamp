import {ERROR, GET_PROJECTS, LOADING_PROJECTS} from "../actionTypes/projects";

const initialState = {
    projects: [
            {
                id:"1",
                title:"Crop Image",
                description:"Test Descr",
                votedByMe:true,
            },
            {
                id:"2",
                title:"Canvas",
                description:"Test Descr",
                votedByMe:false,
            },
            {
                id:"3",
                title:"Qwert",
                description:"Testing",
                votedByMe:false,
            },
            {
                id:"4",
                title:"zxc",
                description:"asdasd",
                votedByMe:false,
            }
        ],
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
import {ERROR, GET_TEAMS, LOADING_TEAMS} from "../actionTypes/teams";

const initialState = {
    teams: [
        {
            id:"1",
            name:"Crop Image",
            topic:"Test Descr",
            project:"Project 1",
            members: [
                {
                    firstName:"Gagik",
                    lastName:"Harutyunyan",
                    avatarUrl:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                },
                {
                    firstName:"asd",
                    lastName:"asdasdasd",
                    avatarUrl:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                },
                {
                    firstName:"Gaasdasdgik",
                    lastName:"asdasd",
                    avatarUrl:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                },
                {
                    firstName:"asdasd",
                    lastName:"asdasd",
                    avatarUrl:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                },
            ],
        },
        {
            id:"2",
            name:"gfhgfh",
            topic:"Test Descr",
            project:"Project 2",
            members: [
                {
                    firstName:"asd",
                    lastName:"zxczxc",
                    avatarUrl:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                },
                {
                    firstName:"Gagik",
                    lastName:"Harutyunyan",
                    avatarUrl:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                },
                {
                    firstName:"Gagik",
                    lastName:"Harutyunyan",
                    avatarUrl:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                },
                {
                    firstName:"Gagik",
                    lastName:"Harutyunyan",
                    avatarUrl:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                },
            ],
        },
        {
            id:"3",
            name:"asdasdzxc",
            topic:"Test Descr",
            project:"Project 3",
            members: [
                {
                    firstName:"Gagik",
                    lastName:"Harutyunyan",
                    avatarUrl:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                },
                {
                    firstName:"Gagik",
                    lastName:"Harutyunyan",
                    avatarUrl:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                },
                {
                    firstName:"Gagik",
                    lastName:"Harutyunyan",
                    avatarUrl:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                },
                {
                    firstName:"Gagik",
                    lastName:"Harutyunyan",
                    avatarUrl:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                },
            ],
        },
        {
            id:"4",
            name:"asdasd",
            topic:"Test Descr",
            project:"Project 4",
            members: [
                {
                    firstName:"Gagik",
                    lastName:"Harutyunyan",
                    avatarUrl:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                },
                {
                    firstName:"Gagik",
                    lastName:"Harutyunyan",
                    avatarUrl:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                },
                {
                    firstName:"Gagik",
                    lastName:"Harutyunyan",
                    avatarUrl:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                },
                {
                    firstName:"Gagik",
                    lastName:"Harutyunyan",
                    avatarUrl:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                },
            ],
        },
    ],
    isLoading: false,
    error: false
}

const ProjectsReducer = (state = initialState,action) => {
    switch (action.type) {
        case GET_TEAMS:
            return {
                ...state,projects:[...action.payload]
            };
        case LOADING_TEAMS:
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
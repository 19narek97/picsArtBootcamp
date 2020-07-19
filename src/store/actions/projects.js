import {ERROR, GET_PROJECTS, LOADING_PROJECTS} from "../actionTypes/projects";
import axios from "../../utils/request";
import {notification} from "antd";


export const fetchDataProjects = () => {
    return (dispatch) => {
        let token = localStorage.getItem("token");

        dispatch(loading(true))

        axios.get('api/v1/projects',{ headers: {
                token
            }})
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(loading(false))

                return response;
            })
            .then((response) => dispatch(getDataProjects(response.data)))
            .catch(() => {
                dispatch(loading(false))
                dispatch(errorFetchData(true))
            });
    }
};

export const voteProject = (id,likeOrUnlike) => {
    return (dispatch) => {
        let token = localStorage.getItem("token");
        axios.post(`api/v1/projects/${id}/voting`,{type:likeOrUnlike},{ headers: {
                token
            }})
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => dispatch(afterVoteDataProjects()))
            .catch(() => {

                notification.warning({
                    message: `Notification`,
                    description: 'An error occurred, please try again',
                    placement: "topRight",
                });
            });
    }
}

export const afterVoteDataProjects = () => {
    return (dispatch) => {
        let token = localStorage.getItem("token");

        axios.get('api/v1/projects',{ headers: {
                token
            }})
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }


                return response;
            })
            .then((response) => dispatch(getDataProjects(response.data)))
            .catch(() => {
                dispatch(errorFetchData(true))
            });
    }
}

export const loading = (boolean) => {
    return {
        type: LOADING_PROJECTS,
        payload: boolean
    }
}

export const getDataProjects = (data) => {
    return {
        type: GET_PROJECTS,
        payload: [...data]
    }
}

export const errorFetchData = (boolean) => {
    return {
        type: ERROR,
        payload: boolean
    }
}
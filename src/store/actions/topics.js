import axios from "../../utils/request";
import {ERROR, GET_TOPICS, LOADING_TOPICS} from "../actionTypes/topics";
import {notification} from "antd";

export const loadingTopics = (boolean) => {
    return {
        type: LOADING_TOPICS,
        payload: boolean
    }
}

export const getDataTopics = (data) => {
    return {
        type: GET_TOPICS,
        payload: [...data]
    }
}

export const deleteTopic = (id) => {
    return (dispatch) => {
        let token = localStorage.getItem("token");

        axios.delete(`api/v1/topics/${id}`,{ headers: {
                token
            }})
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => dispatch(afterVoteDataTopics()))
            .catch(() => {

                notification.warning({
                    message: `Notification`,
                    description: 'An error occurred, please try again',
                    placement: "topRight",
                });
            });
    }
}

export const votedByMe = (id,likeOrUnlike) => {
    return (dispatch) => {
        let token = localStorage.getItem("token");

        axios.post(`api/v1/topics/${id}/voting`,{type:likeOrUnlike},{ headers: {
                token
            }})
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }



                return response;
            })
            .then((response) => dispatch(afterVoteDataTopics()))
            .catch(() => {

                notification.warning({
                    message: `Notification`,
                    description: 'An error occurred, please try again',
                    placement: "topRight",
                });
            });
    }
}

export const fetchDataTopics = () => {
    return (dispatch) => {
        let token = localStorage.getItem("token");
         dispatch(loadingTopics(true))

        axios.get('api/v1/topics',{ headers: {
                token
            }})
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(loadingTopics(false))

                return response;
            })
            .then((response) => dispatch(getDataTopics(response.data.reverse())))
            .catch(() => {
                dispatch(loadingTopics(false))
                dispatch(errorFetchData(true))
            });
    }
};

export const afterVoteDataTopics = () => {
    return (dispatch) => {
        let token = localStorage.getItem("token");

        axios.get('api/v1/topics',{ headers: {
                token
            }})
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => dispatch(getDataTopics(response.data.reverse())))
            .catch(() => {
                notification.warning({
                    message: `Notification`,
                    description: 'Please try again',
                    placement: "topRight",
                });
            });
    }
};

export const addTopic = (title) => {
    return (dispatch) => {
        let token = localStorage.getItem("token");
        dispatch(loadingTopics(true))

        axios.post('api/v1/topics',{title},{ headers: {
                token
            }})
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(loadingTopics(false))

                return response;
            })
            .then((response) => dispatch(fetchDataTopics()))
            .catch(() => {
                dispatch(loadingTopics(false))
                notification.warning({
                    message: `Notification`,
                    description: 'We couldn\'t add, please try again',
                    placement: "topRight",
                });
            });
    }
}

export const errorFetchData = (boolean) => {
    return {
        type: ERROR,
        payload: boolean
    }
}
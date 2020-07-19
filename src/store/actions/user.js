import {GET_USER, LOADING_DATA, ERROR,UPDATE_PROFILE} from "../actionTypes/user"
import axios from "../../utils/request";
import { notification } from 'antd';

export const onAuthUser = (token) => {
    return (dispatch) => {
        dispatch(loading(true))
        axios.get("api/v1/users",{ headers: {
                token
            }}).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }
            dispatch(loading(false))
            return response;
        }).then(({data}) => {
            dispatch(getUser(data))
        })
        .catch((err) => {
            localStorage.removeItem("token")
            dispatch(getUser({}))
            dispatch(loading(false))
            notification.warning({
                message: `Notification`,
                description: 'Please enter your password and login.',
                placement:"topRight",
            });
        });
    }
}

export const updateProfile = (req,token,historyPush) => {
    return (dispatch) => {
        dispatch(loading(true))
        axios.put("api/v1/users/update",{...req}, {
            headers: {
                token
            },
        }).then((response) => {

            if (response.status !== 200) {
                throw Error(response.statusText);
            }
            dispatch(loading(false))
            return response;
        }).then(({data}) => {
            delete data.token
            dispatch(UpdateUser(data))
            historyPush("/home")
        })
        .catch((err) => {
            dispatch(loading(false))
            historyPush("/home")
            notification.warning({
                message: `Notification`,
                description: 'We were unable to update please try again',
                placement: "topRight",
            });

        });
    }
}

export const logOut = (token,historyPush) => {
    return (dispatch) => {
        axios.get("api/v1/users/logout",{ headers: {
                token
            }}).then((response) => {
            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            return response;
        }).then(({data}) => {
            localStorage.removeItem("token");
            dispatch(getUser({}));
            historyPush("/")
        })
        .catch((err) => {
            notification.info({
                message: `Notification`,
                description: 'Please try again.',
                placement:"topRight",
            });
        });
    }
}

export const loginUser =  (data, historyPush) => {
    return (dispatch) => {

        dispatch(loading(true))

        axios.post('api/v1/users/login', {...data})
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(loading(false))

                return response;
            })
            .then(({data}) => {
                localStorage.setItem("token", data.token)
                historyPush("/home")
                dispatch(getUser(data))
            })
            .catch(() => {
                dispatch(loading(false))
                dispatch(errorFetchData(true))
            });
    }
}

export const getUser = (data) => {
    return {
        type: GET_USER,
        payload: {...data}
    }
}

export const UpdateUser = (data) => {
    return {
        type: UPDATE_PROFILE,
        payload: {...data}
    }
}

export const loading = (boolean) => {
    return {
        type: LOADING_DATA,
        payload: boolean
    }
}

export const errorFetchData = (boolean) => {
    return {
        type: ERROR,
        payload: boolean
    }
}
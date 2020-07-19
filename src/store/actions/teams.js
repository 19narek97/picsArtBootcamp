import {ERROR, GET_TEAMS, LOADING_TEAMS} from "../actionTypes/teams";
import axios from "../../utils/request";

export const fetchDataTeams = () => {
    return (dispatch) => {
        let token = localStorage.getItem("token");

        dispatch(loadingTeams(true))

        axios.get('api/v1/teams',{ headers: {
            token
        }})
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(loadingTeams(false))

                return response;
            })
            .then((response) => dispatch(getDataTeams(response.data)))
            .catch(() => {
                dispatch(loadingTeams(false))
                dispatch(errorFetchData(true))
            });
    }
};

export const loadingTeams = (boolean) => {
    return {
        type: LOADING_TEAMS,
        payload: boolean
    }
}

export const getDataTeams = (data) => {
    return {
        type: GET_TEAMS,
        payload: [...data]
    }
}

export const errorFetchData = (boolean) => {
    return {
        type: ERROR,
        payload: boolean
    }
}
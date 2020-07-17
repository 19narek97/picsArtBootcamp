import {GET_COMPANIES, LOADING_DATA, ERROR} from "../actionTypes/registration"
import axios from "../../utils/request";

export const fetchDataCompanies = () => {
    return (dispatch) => {

        dispatch(loading(true))

        axios.get('api/v1/companies')
             .then((response) => {
                 if (response.status !== 200) {
                     throw Error(response.statusText);
                 }

                 dispatch(loading(false))

                 return response;
             })
            .then((response) => dispatch(getDataCompanies(response.data)))
            .catch(() => {
                dispatch(loading(false))
                dispatch(errorFetchData(true))
            });
    }
};

export const loading = (boolean) => {
    return {
        type: LOADING_DATA,
        payload: boolean
    }
}

export const getDataCompanies = (data) => {
    return {
        type: GET_COMPANIES,
        payload: [...data]
    }
}

export const errorFetchData = (boolean) => {
    return {
        type: ERROR,
        payload: boolean
    }
}
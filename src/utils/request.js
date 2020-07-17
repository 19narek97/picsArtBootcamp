import axios from "axios";

export default axios.create({
    baseURL: "https://picsart-bootcamp-2020-api.herokuapp.com/",
    responseType: "json"
});
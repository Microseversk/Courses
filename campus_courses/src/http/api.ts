import axios, {AxiosInstance} from "axios";
import {BASE_URL} from "../constansts/API";

export const $api : AxiosInstance = axios.create({
    baseURL: BASE_URL,
})


import axios from 'axios';
import {apiUrl} from "./constants";

export const axiosApi = axios.create({
    baseURL: apiUrl
});
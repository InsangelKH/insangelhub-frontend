import axios from 'axios';
import { USER_LOCAL_STORAGE_KEY } from 'shared/consts/localstorage';

export const SERVER_URL = 'http://localhost:3000';

export const $api = axios.create({
    baseURL: SERVER_URL,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.authorization = localStorage.getItem(USER_LOCAL_STORAGE_KEY) || '';
    }

    return config;
});

import axios from 'axios';
import { USER_LOCAL_STORAGE_KEY } from 'shared/consts/localstorage';

export const $api = axios.create({
    baseURL: 'http://localhost:3000',
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = localStorage.getItem(USER_LOCAL_STORAGE_KEY) || '';
    }

    return config;
});

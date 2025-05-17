import axios from 'axios';

import { BACKEND_URI } from 'config';

export const axiosInstance = axios.create({
    baseURL: BACKEND_URI,
});

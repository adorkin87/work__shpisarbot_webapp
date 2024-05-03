import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BACK_URL,
    timeout: 10000
});

const collectErrors = axios.create({
    baseURL: import.meta.env.VITE_BACK_URL,
    timeout: 10000
});

//request
httpClient.interceptors.request.use((request) => {
    request.data.initData = Telegram.WebApp.initData;
    return request;
});

collectErrors.interceptors.request.use((request) => {
    request.data.initData = Telegram.WebApp.initData;
    return request;
});

//response
httpClient.interceptors.response.use(handleResponse, handleError);

//handlers
function handleResponse(response: AxiosResponse) {
    import.meta.env.DEV && console.log(response.data);

    if (response.data.hasOwnProperty('error')) {
        toast.error(response.data.error);
    }

    return response;
}

function handleError(error: AxiosError) {
    import.meta.env.DEV && console.error(error);

    collectErrors.post('/logs', { payload: { endpoint: error.config?.url, error: error.config } });
    toast.error('Произошла ошибка при обращении к серверу', { autoClose: false });

    return error;
}

export default httpClient;

import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3008',
});

instance.interceptors.response.use((response) => {
    // eslint-disable-next-line
    const { data } = response;
    return response.data;
});

export default instance;

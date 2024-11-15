import axios from 'axios';
import router from '@/router';
const client = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});

client.interceptors.request.use((config) => config);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      router.push('/');
    }
    return Promise.reject(error);
  }
);

export default client;

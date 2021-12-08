import axios from 'axios';
// import { BACKEND_API } from '@env';

const api = axios.create({
  baseURL: `http://192.168.0.112:3333`,
});

export { api };

import axios from 'axios';

const { BACKEND_API } = process.env;

const api = axios.create({
  baseURL: `${BACKEND_API}:3333`,
});

export { api };

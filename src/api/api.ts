import axios from 'axios';

const { BACKEND_API } = process.env;

console.log(`${BACKEND_API}:3333`);

const api = axios.create({
  baseURL: `http://192.168.0.112:3333`,
});

export { api };

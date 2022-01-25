import axios from 'axios';

const api = axios.create({
  // baseURL: `https://app-and-hold.herokuapp.com`,
  baseURL: `http://192.168.15.6:3333`,
});

export { api };

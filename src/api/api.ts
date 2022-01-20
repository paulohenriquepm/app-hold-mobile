import axios from 'axios';

const api = axios.create({
  baseURL: `https://app-and-hold.herokuapp.com`,
});

export { api };

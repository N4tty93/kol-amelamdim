import axios from 'axios';

const instanceConfig = {
  baseURL: 'http://localhost:4200',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
};

const instance = axios.create(instanceConfig);

export default instance;

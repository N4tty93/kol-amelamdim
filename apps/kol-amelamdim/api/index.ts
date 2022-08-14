import axios from 'axios';

const axiosConfig = {
  baseURL: 'http://localhost:4200',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
};

export default axios.create(axiosConfig);

import axios from 'axios';

const axiosConfig = {
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4200'
      : 'https://' + process.env.NEXT_PUBLIC_VERCEL_URL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
};

export default axios.create(axiosConfig);

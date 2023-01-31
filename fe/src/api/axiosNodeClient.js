import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.API_NODE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;

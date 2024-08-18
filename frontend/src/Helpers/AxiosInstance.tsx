import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
});

 // console.log(process.env.REACT_APP_BACKEND_BASE_URL);
// console.log(apiClient.defaults.baseURL);

export default apiClient;
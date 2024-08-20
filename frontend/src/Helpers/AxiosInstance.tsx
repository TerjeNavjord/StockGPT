import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;
console.log("Base URL:", baseURL);

const apiClient = axios.create({
  baseURL: baseURL,  
  headers: {
    "Content-Type": "application/json",
  },
});


export default apiClient;
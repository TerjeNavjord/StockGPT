import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;
console.log("Base URL:", baseURL);
const backupURL = process.env.REACT_APP_BACKEND_BASE_URL || "https://stockgpt-bdepetb7dza2fzfz.norwayeast-01.azurewebsites.net/api";

const apiClient = axios.create({
  baseURL: backupURL,  
  headers: {
    "Content-Type": "application/json",
  },
});


export default apiClient;
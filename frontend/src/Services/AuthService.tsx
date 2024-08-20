import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";
import apiClient from "../Helpers/AxiosInstance";

const api = "http://localhost:5010/api/";

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await apiClient.post<UserProfileToken>(api + "account/login", {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await apiClient.post<UserProfileToken>(api + "account/register", {
      email: email,
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    handleError(error);
  }
};

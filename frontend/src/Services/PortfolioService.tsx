import axios from "axios";
import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";
import { handleError } from "../Helpers/ErrorHandler";
import apiClient from "../Helpers/AxiosInstance";

const api = "http://localhost:5010/api/portfolio/";

export const portfolioAddAPI = async (symbol: string) => {
  try {
    const data = await axios.post<PortfolioPost>(api + `?symbol=${symbol}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const portfolioDeleteAPI = async (symbol: string) => {
  try {
    const data = await axios.delete<PortfolioPost>(api + `?symbol=${symbol}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const portfolioGetAPI = async () => {
  try {
    const data = await apiClient.get<PortfolioGet[]>("/portfolio/");
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

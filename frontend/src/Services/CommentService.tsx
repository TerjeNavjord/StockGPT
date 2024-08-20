// import axios from "axios";
import { CommentGet, CommentPost } from "../Models/Comment";
import { handleError } from "../Helpers/ErrorHandler";
import apiClient from "../Helpers/AxiosInstance";

// const api = "http://localhost:5010/api/comment/";

export const commentPostAPI = async (
  title: string,
  content: string,
  symbol: string
) => {
  try {
    const data = await apiClient.post<CommentPost>(`/comment/${symbol}`, {
      title: title,
      content: content,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const commentGetAPI = async (symbol: string) => {
  try {
    const data = await apiClient.get<CommentGet[]>(`/comment/?Symbol=${symbol}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

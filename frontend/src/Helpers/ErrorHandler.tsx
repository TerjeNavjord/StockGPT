import axios from "axios";
import { toast } from "react-toastify";

// Define a type for your error response if it has a predictable structure
interface ErrorResponse {
  errors?: Record<string, string[]> | string[];
  status?: number;
  data?: string;
}

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const err = error.response as ErrorResponse;

    // Handle different error structures
    if (err?.data) {
      const { errors, status } = err;
      
      // Handle array of errors
      if (Array.isArray(errors)) {
        errors.forEach((error: string) => toast.warning(error));
      }

      // Handle object errors (field-specific errors)
      if (errors && typeof errors === "object" && !Array.isArray(errors)) {
        Object.keys(errors).forEach((field) => {
          toast.warning(errors[field][0]);
        });
      }
    

      // Handle single string errors
      if (typeof err.data === "string") {
        toast.warning(err.data);
      }

      // Handle specific status codes
      if (status === 401) {
        toast.warning("Please login");
        // Redirect to login page or handle in a centralized manner
        window.location.href = "/login"; // Better than pushState for redirection
      } else if (status === 403) {
        toast.warning("You don't have permission to perform this action.");
      } else if (status === 404) {
        toast.warning("Requested resource not found.");
      } else if (status === 500) {
        toast.error("Server error, please try again later.");
      }
    } else {
      // Generic error handler
      toast.error("An unexpected error occurred.");
    }
  } else {
    // Handle non-Axios errors (network issues, etc.)
    toast.error("Network error, please check your connection.");
  }
};


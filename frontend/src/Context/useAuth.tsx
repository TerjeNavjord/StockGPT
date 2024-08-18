import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import apiClient from "../Helpers/AxiosInstance"; // Use your custom Axios instance

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setAuthToken(storedToken);
      console.log("Token set in Axios instance:", storedToken);
    }
    setIsReady(true);
  }, []);

  const setAuthToken = (token: string | null) => {
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common["Authorization"];
    }
  };

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const res = await registerAPI(email, username, password);
      if (res) {
        const newToken = res.data.token;
        const userObj = {
          userName: res.data.userName,
          email: res.data.email,
        };
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(newToken);
        setUser(userObj);
        setAuthToken(newToken);
        console.log("Token set after registration:", newToken);
        toast.success("Registration Successful!");
        navigate("/search");
      }
    } catch (e) {
      toast.warning("Server error occurred");
    }
  };

  const loginUser = async (username: string, password: string) => {
    try {
      const res = await loginAPI(username, password);
      if (res) {
        const newToken = res.data.token;
        const userObj = {
          userName: res.data.userName,
          email: res.data.email,
        };
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(newToken);
        setUser(userObj);
        setAuthToken(newToken);
        console.log("Token set after login:", newToken);
        toast.success("Login Successful!");
        navigate("/search");
      }
    } catch (e) {
      toast.warning("Server error occurred");
    }
  };

  const isLoggedIn = () => !!user;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    setAuthToken(null);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);

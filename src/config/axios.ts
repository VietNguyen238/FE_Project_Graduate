import axios from "axios";
import { env } from "./env";

interface axiosProps {
  link: string;
  form?: string[];
}

const localhost = env.LOCALHOST;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const axiosPost = async ({ link, form }: axiosProps) => {
  try {
    const response = await axios.post(`${localhost}${link}`, form);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

const axiosGet = async ({ link }: axiosProps) => {
  try {
    const response = await axios.get(`${localhost}${link}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

const axiosDelete = async ({ link }: axiosProps) => {
  try {
    const response = await axios.delete(`${localhost}${link}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export { axiosPost, axiosGet, axiosDelete };

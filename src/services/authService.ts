import { env } from "../config/env";
import {
  updateError,
  updateStart,
  updateSuccess,
  clearUser,
  clearAddress,
} from "../store/userSlice";
import axios from "axios";
import { toastSuccess, toastError } from "../components/utils/toast";
import { clearCart } from "../store/cartSlice";
import { getCart } from "./cartService";
import { clearOrder } from "../store/orderSlice";

const local = env.LOCALHOST;

const register = async (user: any) => {
  try {
    const res = await axios.post(`${local}/auth/register`, user);
    toastSuccess("Đăng ký thành công!");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toastError(error.response?.data.message);
    }
  }
};

const login = async (user: any, dispatch: any) => {
  dispatch(updateStart());
  try {
    const res = await axios.post(`${local}/auth/login`, user);
    localStorage.setItem("accessToken", res.data.accessToken);
    toastSuccess("Đăng nhập thành công!");
    dispatch(updateSuccess(res.data));
    getCart(dispatch);
    return { success: true };
  } catch (error) {
    dispatch(updateError());
    return { success: false };
  }
};

const loginGoogle = async (user: any, dispatch: any) => {
  dispatch(updateStart());
  try {
    const res = await axios.post(`${local}/auth/login-google`, user);
    localStorage.setItem("accessToken", res.data.accessToken);
    toastSuccess("Đăng nhập thành công!");
    dispatch(updateSuccess(res.data));
    dispatch(getCart(dispatch));
  } catch (error) {
    dispatch(updateError());
  }
};

const logout = async (dispatch: any) => {
  try {
    await axios.post(`${local}/auth/logout`);
    localStorage.removeItem("accessToken");
    dispatch(clearUser());
    dispatch(clearAddress());
    dispatch(clearCart());
    dispatch(clearOrder());
    toastSuccess("Đăng xuất thành công!");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toastError(error.response?.data.message);
    }
  }
};

export { register, login, loginGoogle, logout };

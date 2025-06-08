import { toastSuccess } from "../components/utils/toast";
import { axiosGet, axiosPost } from "../config/axios";
import { updateOrder } from "../store/orderSlice";
import { getAddress } from "./addressService";
import { getCart } from "./cartService";

const getIdOrder = async (id: string, dispatch: any) => {
  const order = await axiosGet({ link: `/order/${id}` });
  dispatch(updateOrder(order));
  getAddress(dispatch);
};

const getOrder = async (dispatch: any) => {
  const order = await axiosGet({ link: `/order/me` });
  dispatch(updateOrder(order));
};

const getAllOrder = async (dispatch: any) => {
  const order = await axiosGet({ link: `/order` });
  dispatch(updateOrder(order));
};

const addOrder = async (form: any, dispatch: any) => {
  const order = await axiosPost({ link: "/order/add", form });
  dispatch(updateOrder(order));
  getCart(dispatch);
  toastSuccess("Đã tạo đơn hàng thành công!");
};

const updateUserOrder = async (form: any, dispatch: any, id: string) => {
  const order = await axiosPost({ link: `/order/update/${id}`, form });
  dispatch(updateOrder(order));
  toastSuccess("Đã cập nhật đơn hàng thành công!");
};

export { addOrder, updateUserOrder, getOrder, getIdOrder, getAllOrder };

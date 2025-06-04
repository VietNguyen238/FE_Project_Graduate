import { toastSuccess } from "../components/utils/toast";
import { axiosDelete, axiosGet, axiosPost } from "../config/axios";
import { updateOrder } from "../store/orderSlice";
import { getAddress } from "./addressService";

const getIdOrder = async (id: string, dispatch: any) => {
  const order = await axiosGet({ link: `/order/${id}` });
  dispatch(updateOrder(order));
  getAddress(dispatch);
};

const getOrder = async (dispatch: any) => {
  const order = await axiosGet({ link: `/order/me` });
  dispatch(updateOrder(order));
};

const addOrder = async (form: any, dispatch: any) => {
  const order = await axiosPost({ link: "/order/add", form });
  dispatch(updateOrder(order));
  toastSuccess("Đã tạo đơn hàng thành công!");
};

const updateUserOrder = async (form: any, dispatch: any, id: string) => {
  await axiosPost({ link: `/order/update/${id}`, form });
  toastSuccess("Đã cập nhật đơn hàng thành công!");
};

const deleteOrder = async (id: string, dispatch: any) => {
  await axiosDelete({ link: `/order/delete/${id}` });
  toastSuccess("Đã hủy đơn hàng thành công!");
};

export { addOrder, updateUserOrder, deleteOrder, getOrder, getIdOrder };

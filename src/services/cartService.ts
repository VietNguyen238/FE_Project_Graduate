import { toastSuccess } from "../components/utils/toast";
import { axiosDelete, axiosGet, axiosPost } from "../config/axios";
import { updateCart } from "../store/cartSlice";

const getCart = async (dispatch: any) => {
  const cart = await axiosGet({ link: `/cart/me` });
  dispatch(updateCart(cart));
};

const addCart = async (form: any, dispatch: any) => {
  const cart = await axiosPost({ link: "/cart/add", form });
  dispatch(updateCart(cart));
  toastSuccess("Đã thêm sản phẩm vào giỏ hàng!");
  getCart(dispatch);
};

const updateUserCart = async (form: any, dispatch: any, id: string) => {
  await axiosPost({ link: `/cart/update/${id}`, form });
  toastSuccess("Cập nhật sản phẩm thành công!");
  getCart(dispatch);
};

const deleteCart = async (id: string, dispatch: any) => {
  await axiosDelete({ link: `/cart/delete/${id}` });
  toastSuccess("Xóa sản phẩm thành công!");
  getCart(dispatch);
};

export { addCart, updateUserCart, deleteCart, getCart };

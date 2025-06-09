import { toastSuccess } from "../components/utils/toast";
import { axiosDelete, axiosGet, axiosPost } from "../config/axios";
import { updateProduct as updateProductAction } from "../store/productSlice";

const getAllProduct = async (dispatch: any) => {
  const product = await axiosGet({ link: "/product" });
  dispatch(updateProductAction(product));
  return product;
};

const getAProduct = async (id: string) => {
  const product = await axiosGet({ link: `/product/${id}` });
  return product;
};

const createProduct = async (form: any) => {
  const product = await axiosPost({ link: "/product/add", form });
  toastSuccess("Thêm sản phẩm thành công!");
  return product;
};

const updateProduct = async (id: string, form: any) => {
  const product = await axiosPost({ link: `/product/${id}`, form });
  toastSuccess("Cập nhật sản phẩm thành công!");
  return product;
};

const deleteProduct = async (id: string) => {
  const product = await axiosDelete({ link: `/product/${id}` });
  toastSuccess("Xóa sản phẩm thành công!");
  return product;
};

export {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAProduct,
};

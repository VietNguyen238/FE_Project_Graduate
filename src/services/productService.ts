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

const createProduct = async (form: any, dispatch: any) => {
  const product = await axiosPost({ link: "/product", form });
  dispatch(updateProductAction(product));
  return product;
};

const updateProduct = async (id: string, form: any) => {
  const product = await axiosPost({ link: `/product/${id}`, form });
  return product;
};

const deleteProduct = async (id: string, dispatch: any) => {
  const product = await axiosDelete({ link: `/product/${id}` });
  dispatch(updateProductAction(product));
  return product;
};

export {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAProduct,
};

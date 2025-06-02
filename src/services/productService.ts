import { axiosDelete, axiosGet, axiosPost } from "../config/axios";

const getAllProduct = async () => {
  const res = await axiosGet({ link: "/product" });
  return res;
};

const getAProduct = async (id: string) => {
  const res = await axiosGet({ link: `/product/${id}` });
  return res;
};

const createProduct = async (form: any) => {
  const res = await axiosPost({ link: "/product", form });
  return res;
};

const updateProduct = async (id: string, form: any) => {
  const res = await axiosPost({ link: `/product/${id}`, form });
  return res;
};

const deleteProduct = async (id: string) => {
  const res = await axiosDelete({ link: `/product/${id}` });
  return res;
};

export {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAProduct,
};

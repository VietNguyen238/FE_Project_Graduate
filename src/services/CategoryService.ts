import { axiosGet } from "../config/axios";
import { updateCategory } from "../store/categorySlice";

const getCategory = async (dispatch: any) => {
  const category = await axiosGet({ link: `/category` });
  dispatch(updateCategory(category));
};

export { getCategory };

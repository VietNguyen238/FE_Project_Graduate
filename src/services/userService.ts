import { toastSuccess } from "../components/utils/toast";
import { axiosGet, axiosPost } from "../config/axios";
import { updateError, updateStart, updateSuccess } from "../store/userSlice";

export const getUser = async (dispatch: any) => {
  dispatch(updateStart());
  try {
    const user = await axiosGet({ link: "/user/me" });
    dispatch(updateSuccess(user));
  } catch (error) {
    dispatch(updateError());
  }
};

export const uddateUser = async (form: any, dispatch: any) => {
  dispatch(updateStart());
  try {
    const user = await axiosPost({ link: "/user/update/me", form });
    dispatch(updateSuccess(user));
    toastSuccess("Cập nhật thành công!");
  } catch (error) {
    dispatch(updateError());
  }
};

export const deleteUser = async (dispatch: any) => {
  dispatch(updateStart());
  try {
    const user = await axiosPost({ link: "/user/delete/me" });
    dispatch(updateSuccess(user));
  } catch (error) {
    dispatch(updateError());
  }
};

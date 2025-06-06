import { toastSuccess } from "../components/utils/toast";
import { axiosGet, axiosPost, axiosDelete } from "../config/axios";
import { updateAddress } from "../store/userSlice";

const getAddress = async (dispatch: any) => {
  const address = await axiosGet({ link: `/address/me` });
  console.log("Address API response:", address);
  dispatch(updateAddress(address));
};

const addAddress = async (form: any, dispatch: any) => {
  const address = await axiosPost({ link: "/address/add", form });
  dispatch(updateAddress(address));
  toastSuccess("Thêm địa chỉ thành công!");
};

const updateUserAddress = async (form: any, dispatch: any) => {
  const address = await axiosPost({
    link: `/address/update/me`,
    form,
  });
  toastSuccess("Cập nhật địa chỉ thành công!");
  dispatch(updateAddress(address));
};

const deleteAddress = async (dispatch: any) => {
  const address = await axiosDelete({ link: `/address/delete/me` });
  toastSuccess("Xóa địa chỉ thành công!");
  dispatch(updateAddress(address));
};

export { getAddress, addAddress, updateUserAddress, deleteAddress };

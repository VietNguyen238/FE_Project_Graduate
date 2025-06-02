import { toast } from "react-toastify";

const toastError = (title: string) => {
  toast.error(title);
};
const toastSuccess = (title: string) => {
  toast.success(title);
};

export { toastError, toastSuccess };

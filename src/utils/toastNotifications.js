import { toast } from "react-toastify";

const setup = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
};

export const toastSuccess = text => toast.success(text, setup);
export const toastError = text => toast.error(text, setup);
export const toastInfo = text => toast.info(text, setup);

import { toast } from "react-toastify";

export const showToastWarning = (message: string, options?: any) => {
  toast.warning(message, {
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "custom-toast",
    ...options,
  });
};

export const showToastSuccess = (message: string) => {
  toast.success(message, {
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "custom-toast",
  });
};

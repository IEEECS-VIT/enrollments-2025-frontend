import { toast } from 'react-toastify';

export const showToastWarning = (message: string) => {
  toast.warning(message, {
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: 'custom-toast',
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
    className: 'custom-toast',
  });
};

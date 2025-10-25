import { Bounce, type ToastOptions, toast } from 'react-toastify';

export const defaultToastOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: 'dark',
  transition: Bounce,
};

export const notifySuccess = (message: string) => {
  toast.success(message, { ...defaultToastOptions });
};
export const notifyError = (message: string) => {
  toast.error(message, { ...defaultToastOptions });
};
export const notifyInfo = (message: string) => {
  toast.info(message, { ...defaultToastOptions });
};

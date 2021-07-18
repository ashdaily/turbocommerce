import {toast} from "react-toastify";

class ToastUtils {
    showInfo = (title, expiration = 1500) => {
        toast.info(title, {
            position: "bottom-right",
            autoClose: expiration,
            hideProgressBar: true,
            closeOnClick: true,
        });
    };

    showErrors = (title, expiration = 1500) => {
        toast.error(title, {
            position: "bottom-right",
            autoClose: expiration,
            hideProgressBar: true,
            closeOnClick: true,
        });
    }
}

export default new ToastUtils();

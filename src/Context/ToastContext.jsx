import { createContext } from "react";
import { Bounce, toast } from "react-toastify";

export let ToastContext = createContext(0);
export default function ToastContextProvider(props) {
  let getToastValue = (type, message) => {
    return toast[type](message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };
  return (
    <ToastContext.Provider value={{getToastValue}}>
        {props.children}
    </ToastContext.Provider>

  )
}

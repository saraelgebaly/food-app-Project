import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import logo from "../../../.../../../assets/images/74297541930ad229a0eda19379889be7.png";
import { AuthContext } from '../../../../Context/AuthContext';
import { ToastContext } from '../../../../Context/ToastContext';


export default function ChangePass({logout}) {

  let {baseUrl, requestHeaders} = useContext(AuthContext)
  let {getToastValue} = useContext(ToastContext)
  const [visible, setVisible] = useState(false);

  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch("newPassword", "");const onSubmit = async (data) => {
    try {
      const response = await axios.put(
      `${baseUrl}/Users/ChangePassword`,
        data,

        {
          headers: requestHeaders,
        }
      );
      console.log(response);
      getToastValue("success","Successfully changed password");

      logout();
    } catch (error) {
      getToastValue("error",error.response.data.message);
    }
  };
  return (
    <>
    <div className="row justify-content-center align-items-center">
              <div className="col-md-12">
                <div className="text-center logo-div">
                  <img className="w-100 " src={logo} />
                </div>
                <div className="form-content">
                  <h3>Change Your Password</h3>
                  <p className="text-muted">Enter your details below </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      type={visible ? "text" : "password"}
                      className="form-control z-0"
                      placeholder="Old Password"
                      {...register("oldPassword", {
                        required: "Old Password is required",
                      })}
                    />
                        <span onClick={() => setVisible(!visible)} className="pass-eye position-absolute">
                    {visible ? (
                      <i className="fa-regular fa-eye "></i>
                    ) : (
                      <i className="fa-regular fa-eye-slash "></i>
                    )}
                  </span>
                  </div>
                  {errors.oldPassword && (
                    <p className="alert alert-danger p-2">
                      {errors.oldPassword.message}{" "}
                    </p>
                  )}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      type={visible ? "text" : "password"}
                      className="form-control z-0"
                      placeholder="New Password"
                      {...register("newPassword", {
                        required: "New Password is required",
                      })}
                    />
                        <span onClick={() => setVisible(!visible)} className="pass-eye position-absolute">
                    {visible ? (
                      <i className="fa-regular fa-eye "></i>
                    ) : (
                      <i className="fa-regular fa-eye-slash "></i>
                    )}
                  </span>
                  </div>
                  {errors.newPassword && (
                    <p className="alert alert-danger p-2">
                      {errors.newPassword.message}{" "}
                    </p>
                  )}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      type={visible ? "text" : "password"}
                      className="form-control z-0"
                      placeholder=" Confirm New Password"
                      {...register("confirmNewPassword", {
                        required: "Confirm New Password is required",
                        validate: (value) =>
                          value === password.current ||
                          "The passwords do not match",
                      })}
                    />
                        <span onClick={() => setVisible(!visible)} className="pass-eye position-absolute">
                    {visible ? (
                      <i className="fa-regular fa-eye "></i>
                    ) : (
                      <i className="fa-regular fa-eye-slash "></i>
                    )}
                  </span>
                  </div>
                  {errors.confirmNewPassword && (
                    <p className="alert alert-danger p-2">
                      {errors.confirmNewPassword.message}{" "}
                    </p>
                  )}

                  <button className="btn btn-success w-100">
                    Change Password
                  </button>
                </form>
              </div>
            </div>
    
    
    </>
  )
}

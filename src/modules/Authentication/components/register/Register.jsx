import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../.../../../assets/images/74297541930ad229a0eda19379889be7.png";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { ToastContext } from "../../../../Context/ToastContext";

export default function Register() {
  let {baseUrl} = useContext(AuthContext)
  let {getToastValue} = useContext(ToastContext)


  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("profileImage", data.profileImage[0]);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    return formData;
  };

  const onSubmit = async (data) => {
    const registerFormData = appendToFormData(data);
    try {
      const response = await axios.post(
        `${baseUrl}/Users/Register`,
        registerFormData
      );
      console.log(response);
      getToastValue("success",response.data.message);
      navigate("/verifyAccount");
    } catch (error) {
      getToastValue("erorr",error.response.data.message);
    }
  };
  return (
    <>
      <div className="authContainer">
        <div className="container-fluid vh-100 bg-overlay">
          <div className="row vh-100  justify-content-center align-items-center">
            <div className="col-md-6 bg-white p-4  border border-3 ">
              <div className="text-center logo-div">
                <img className="logo" src={logo} />
              </div>
              <div className="form-content">
                <h3>Register</h3>
                <p className="text-muted">
                  Welcome Back! Please enter your details{" "}
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-user"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your Username"
                        {...register("userName", {
                          required: "Username is required",
                        })}
                      />
                    </div>
                    {errors.userName && (
                      <p className="alert alert-danger">
                        {errors.userName.message}{" "}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-envelope"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your Email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="alert alert-danger">
                        {errors.email.message}{" "}
                      </p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-flag"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your country"
                        {...register("country", {
                          required: "Country is required",
                        })}
                      />
                    </div>
                    {errors.country && (
                      <p className="alert alert-danger">
                        {errors.country.message}{" "}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-mobile-screen"></i>
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter your Phone Number"
                        {...register("phoneNumber", {
                          required: "Phone Number is required",
                        })}
                      />
                    </div>
                  </div>

                  {errors.phoneNumber && (
                    <p className="alert alert-danger">
                      {errors.phoneNumber.message}{" "}
                    </p>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        type={visible ? "text" : "password"}
                        className="form-control z-0"
                        placeholder="Password"
                        {...register("password", {
                          required: "Password required",
                        })}
                      />
                      <span
                        onClick={() => setVisible(!visible)}
                        className="pass-eye  position-absolute"
                      >
                        {visible ? (
                          <i className="fa-regular fa-eye  "></i>
                        ) : (
                          <i className="fa-regular fa-eye-slash "></i>
                        )}
                      </span>
                    </div>
                    {errors.password && (
                      <p className="alert alert-danger">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        type={visible ? "text" : "password"}
                        className="form-control z-0"
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                          required: "Confirm Password required",
                          validate: (value) =>
                            value === password.current ||
                            "The passwords do not match",
                        })}
                      />
                       <span
                        onClick={() => setVisible(!visible)}
                        className="pass-eye  position-absolute"
                      >
                        {visible ? (
                          <i className="fa-regular fa-eye  "></i>
                        ) : (
                          <i className="fa-regular fa-eye-slash "></i>
                        )}
                      </span>
                    </div>
                    {errors.confirmPassword && (
                      <p className="alert alert-danger">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className="form-control"
                      {...register("profileImage", {
                        required: "Profile Image is required",
                      })}
                    />
                  </div>
                  {errors.profileImage && (
                    <p className="alert alert-danger">
                      {errors.profileImage.message}
                    </p>
                  )}
                </div>
                <div className="text-end p-2">
                  <Link
                    className="text-decoration-none text-success"
                    to={"/login"}
                  >
                    Login Now?
                  </Link>
                </div>
                <button className="btn btn-success w-100">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

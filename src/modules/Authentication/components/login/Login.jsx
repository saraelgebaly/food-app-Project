import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../.../../../assets/images/74297541930ad229a0eda19379889be7.png";
import { AuthContext } from "../../../../Context/AuthContext";
import { ToastContext } from "../../../../Context/ToastContext";

export default function Login() {
  let {baseUrl,saveLoginData} = useContext(AuthContext)
  let {getToastValue} = useContext(ToastContext)


  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${baseUrl}/Users/Login`,
        data
      );

      getToastValue("success","logged in successfully");
      navigate("/dashboard", { replace: true });
      localStorage.setItem("token", response.data.token);
      saveLoginData();
    } catch (error) {
      getToastValue("error",error.response.data.message);
      console.log(error);
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
                <h3>Login</h3>
                <p className="text-muted">
                  Welcome Back! Please enter your details
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-mobile-screen"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="alert alert-danger">{errors.email.message} </p>
                )}
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
                  <span onClick={() => setVisible(!visible)} className="pass-eye position-absolute">
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
                <div className="links d-flex justify-content-between my-3">
                  <Link
                    className="text-decoration-none text-black"
                    to="/register"
                  >
                    Register Now?
                  </Link>
                  <Link
                    className="text-decoration-none text-success"
                    to="/forgetPass"
                  >
                    Forget Password?
                  </Link>
                </div>
                <button className="btn btn-success w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

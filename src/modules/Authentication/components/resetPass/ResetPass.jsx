import React from "react";
import logo from "../../../.../../../assets/images/74297541930ad229a0eda19379889be7.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ResetPass() {
  const navigate = useNavigate()
  let{
    register,
    handleSubmit,
    formState:{errors}
  } = useForm()
  const onSubmit = async (data) => {
   try {
    const res = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset', data)
   console.log(res);
   toast.success(res.data.message);
   navigate('/')
   } catch (error) {
    toast.error(error.response.data.message);
   }
  }
  return (
    <>
      <div className="authContainer">
        <div className="container-fluid vh-100 bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-6 bg-white p-4  border border-3 ">
              <div className="text-center">
                <img className="logo" src={logo} />
              </div>
              <div className="form-content">
                <h3>Reset Password</h3>
                <p className="text-muted">
                  Please Enter Your Otp or Check Your Inbox
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
              {errors.email && <p className="alert alert-danger">{errors.email.message} </p>}

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="OTP"
                  {...register("seed",{
                    required:"Code is required"
                  })}
                />
              </div>
              {errors.seed && <p className="alert alert-danger">{errors.seed.message} </p>}

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="New Password"
                  {...register("password",{
                    required:"New Password is required"
                  })}
                />
              </div>
              {errors.password && <p className="alert alert-danger">{errors.password.message} </p>}

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Confirm new password"
                  {...register("confirmPassword",{
                    required:"Confirm New Password is required"
                  })}
                />
              </div>
              {errors.confirmPassword && <p className="alert alert-danger">{errors.confirmPassword.message} </p>}

              <button className="btn btn-success w-100">Reset Password</button>
      </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

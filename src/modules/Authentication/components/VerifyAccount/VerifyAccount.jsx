import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import logo from "../../../.../../../assets/images/74297541930ad229a0eda19379889be7.png";
import { toast } from "react-toastify";
import axios from "axios";

export default function VerifyAccount() {
    const navigate = useNavigate();

    let {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = async (data)=> {
      try{
        const res = await axios.put('https://upskilling-egypt.com:3006/api/v1/Users/verify',data)
        console.log(res);
        toast.success(res.data.message);
        navigate('/login')
      }catch(error){
        toast.error(error.response.data.message);
      }
   
    }
    return (
     <>
     <div className='authContainer'>
      <div className='container-fluid vh-100 bg-overlay'>
        <div className="row vh-100  justify-content-center align-items-center">
          <div className="col-md-6 bg-white p-4  border border-3 ">
          <div className="text-center logo-div">
                  <img className="logo " src={logo} />
                </div>
                <div className="form-content">
                  <h3>Verify Account</h3>
                  <p className="text-muted">
                  Welcome Back! Please enter your details
                </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Email"
                      {...register("email",{
                        required: "Email is required",
                      
                      })}
                    />
                  </div>
                  {errors.email && <p className="alert alert-danger">{errors.email.message} </p>}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-key"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Verification code"
                      {...register("code",{
                        required: "Code is required",
                      
                      })}
                    />
                  </div>
                  {errors.code && <p className="alert alert-danger">{errors.code.message} </p>}
                  <button className="btn btn-success w-100">Verify</button>
                </form>
  
          </div>
        </div>
      </div>
     </div>
     </>
    )
}

import React from 'react'
import { useForm } from 'react-hook-form';
import logo from "../../../.../../../assets/images/74297541930ad229a0eda19379889be7.png";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthContext';


export default function ForgetPass()
 {
  let {baseUrl} = useContext(AuthContext)
  let {getToastValue} = useContext(ToastContainer)


  const navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data)=> {
    try{
      const res = await axios.post(`${baseUrl}/Users/Reset/Request`,data)
      console.log(res);
      getToastValue("success",res.data.message);
      navigate('/resetPass')
    }catch(error){
      getToastValue("error",error.response.data.message);
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
                <h3>Forgot Your Password?</h3>
                <p className="text-muted">
                No worries! Please enter your email and we will send a password reset link
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
                    {...register("email",{
                      required: "Email is required",
                      pattern:{
                        value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email"
                      }
                    })}
                  />
                </div>
                {errors.email && <p className="alert alert-danger">{errors.email.message} </p>}
                <button className="btn btn-success w-100">Submit</button>
              </form>

        </div>
      </div>
    </div>
   </div>
   </>
  )
}

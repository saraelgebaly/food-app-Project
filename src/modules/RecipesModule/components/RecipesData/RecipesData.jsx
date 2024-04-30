// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import logo from "../../../.../../../assets/images/74297541930ad229a0eda19379889be7.png";


// export default function RecipesData() {
//     const navigate = useNavigate();
//     let {
//       register,
//       handleSubmit,
//       formState: { errors },
//       watch
//     } = useForm();
   
//     const onSubmit = async (data) => {
//     //   try {
//     //     const res = await axios.post(
//     //       "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
//     //       data
//     //     );
//     //     console.log(res);
//     //     toast.success(res.data.message);
//     //     navigate("/");
//     //   } catch (error) {
//     //     toast.error(error.response.data.message);
//     //   }
//     };
//     return (
//       <>
       
//           <div className="container-fluid">
//             <div className="row justify-content-center align-items-center">
//               <div className="col-md-6 ">
//                 <div className="text-center logo-div">
//                   <img className="logo" src={logo} />
//                 </div>
//                 <div className="form-content">
//                   <h3>Reset Password</h3>
//                   <p className="text-muted">
//                     Please Enter Your Otp or Check Your Inbox
//                   </p>
//                 </div>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                   <div className="input-group mb-3">
                   
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder=""
//                       {...register("email", {
//                         required: "Email is required",
                        
//                       })}
//                     />
//                   </div>
//                   {errors.email && (
//                     <p className="alert alert-danger">{errors.email.message} </p>
//                   )}
  
//                   <div className="input-group mb-3">
                
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder=""
//                       {...register("seed", {
//                         required: "Code is required",
//                       })}
//                     />
//                   </div>
//                   {errors.seed && (
//                     <p className="alert alert-danger">{errors.seed.message} </p>
//                   )}
  
//                   <div className="input-group mb-3">
                    
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder=""
//                       {...register("password", {
//                         required: "New Password is required",
//                       })}
//                     />
//                   </div>
//                   {errors.password && (
//                     <p className="alert alert-danger">
//                       {errors.password.message}
//                     </p>
//                   )}
  
//                   <div className="input-group mb-3">
                    
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Confirm new password"
//                       {...register("confirmPassword", {
//                         required: "Confirm New Password is required",
                       
//                       })}
//                     />
//                   </div>
//                   {errors.confirmPassword && (
//                     <p className="alert alert-danger">
//                       {errors.confirmPassword.message}
//                     </p>
//                   )}
  
//                   <button className="btn btn-success w-100">
//                     Reset Password
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
       
//       </>
//     );
//   }


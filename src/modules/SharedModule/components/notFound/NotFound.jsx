import React from "react";
import logo from '../../../../assets/images/logo.png';
import { useNavigate } from "react-router-dom";
export default function NotFound()

{
  const navigate = useNavigate()
  return (
    <>
    <div className="bg-img">
    
    <div className="container ">
    <nav>
          <img src={logo} className="logo-img" />
        </nav>
        <div className="row vh-100 d-flex  align-items-center">
          <div className="col-md-4">
            <h1 className="text-color1">Oops.</h1>
            <h2 className="text-success">Page not found </h2>
            <p className="text-color2">
              This Page doesn’t exist or was removed! We suggest you back to
              home.
            </p>
            <button onClick={()=>{navigate('/dashboard')}} className="btn btn-success px-5 py-3 mt-3 mx-3"  >Back to Home</button>
          </div> 
        </div>
      </div>
    </div>
     
    </>
  );
}

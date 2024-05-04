import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import toggler from '../../../../assets/images/3.png'
import { useForm } from 'react-hook-form';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "../../../.../../../assets/images/74297541930ad229a0eda19379889be7.png";



export default function SideBar() {
  const[isCollapsed, setisCollapsed] = useState(true)
  const toggleCollapsed = () => {
    setisCollapsed(!isCollapsed)
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const password = useRef({})
  password.current = watch("newPassword","")
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword",
        data,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      ); 
      console.log(response);
      toast.success("Successfully changed password");
      
      logout();

      
    } catch (error) {
      toast.error(error.response.message);
    }
  };
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <>
     <Modal show={show} onHide={handleClose}>
       
        <Modal.Body>
          <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-12">
              <div className="text-center logo-div">
                  <img className="w-100 " src={logo} />
                </div>
                <div className="form-content">
                  <h3>Change Your Password</h3>
                  <p className="text-muted">
                  Enter your details below                </p>
                </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-lock"></i>
                    </span>
              <input
                type="password"
                className="form-control"
                placeholder="Old Password"
                {...register("oldPassword", {
                  required: "Old Password is required",
                })}
              />
            </div>
            {errors.oldPassword && (
              <p className="alert alert-danger p-2">{errors.oldPassword.message} </p>
            )}
                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-lock"></i>
                    </span>
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                {...register("newPassword", {
                  required: "New Password is required",
                })}
              />
            </div>
            {errors.newPassword && (
              <p className="alert alert-danger p-2">{errors.newPassword.message} </p>
            )}
                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-lock"></i>
                    </span>
              <input
                type="password"
                className="form-control"
                placeholder=" Confirm New Password"
                {...register("confirmNewPassword", {
                  required: "Confirm New Password is required",
                  validate : value =>
                  value === password.current || "The passwords do not match"
                })}
              />
            </div>
            {errors.confirmNewPassword && (
              <p className="alert alert-danger p-2">{errors.confirmNewPassword.message} </p>
            )}

            <button  className="btn btn-success w-100">Change Password</button>
          </form>
              </div>
            </div>
          </div>
      
        </Modal.Body>
      </Modal>
 <div className='sidebar-container sticky-top'>
 <Sidebar collapsed={isCollapsed}>
  <Menu>
    <img  onClick={toggleCollapsed} className='toggle w-75 mx-2' src={toggler}/>
    <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to="/dashboard" />}>Home</MenuItem>
    <MenuItem icon={<i className='fa fa-user-group'></i>} component={<Link to="/dashboard/users" />}>Users</MenuItem>
    <MenuItem icon={<i className='fa fa-utensils'></i>} component={<Link to="/dashboard/recipes" />}>Recipes</MenuItem>
    <MenuItem icon={<i className='fa fa-calendar-days'></i>} component={<Link to="/dashboard/categories" />}>Categories</MenuItem>
    <MenuItem onClick={handleShow}  icon={<i className='fa fa-lock'></i>}>Change Password</MenuItem>
    <MenuItem onClick={logout} icon={<i className="fa fa-right-from-bracket"></i>}>Logout</MenuItem>
  </Menu>
</Sidebar>
 </div>
    
    </>
  )
}

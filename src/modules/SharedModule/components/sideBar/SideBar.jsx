import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import toggler from "../../../../assets/images/3.png";
import ChangePass from "../../../Authentication/components/changePass/ChangePass";
import { AuthContext } from "../../../../Context/AuthContext";

export default function SideBar() {
  let {loginData} = useContext(AuthContext)
  const [isCollapsed, setisCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setisCollapsed(!isCollapsed);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="container-fluid">
            
            <ChangePass logout={logout}/>
          </div>
        </Modal.Body>
      </Modal>
      <div className="sidebar-container sticky-top">
        <Sidebar collapsed={isCollapsed}>
          <Menu>
            <img
              onClick={toggleCollapsed}
              className="toggle w-100 "
              src={toggler}
            />
            <MenuItem
              icon={<i className="fa fa-home"></i>}
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>
            {loginData?.userGroup == "SuperAdmin" ? (
              <MenuItem
                icon={<i className="fa fa-user-group"></i>}
                component={<Link to="/dashboard/users" />}
              >
                Users
              </MenuItem>
            ) : (
              ""
            )}

            <MenuItem
              icon={<i className="fa fa-utensils"></i>}
              component={<Link to="/dashboard/recipes" />}
            >
              Recipes
            </MenuItem>
            {loginData?.userGroup == "SuperAdmin" ? (
              <MenuItem
                icon={<i className="fa fa-calendar-days"></i>}
                component={<Link to="/dashboard/categories" />}
              >
                Categories
              </MenuItem>
            ) : (
              ""
            )}
            {loginData?.userGroup == 'SystemUser'? (
                   <MenuItem
                   icon={<i className="fa fa-heart"></i>}
                   component={<Link to="/dashboard/fav" />}
                 >
                  Favorites
                 </MenuItem>
            ): ("")}
        

            <MenuItem
              onClick={handleShow}
              icon={<i className="fa fa-lock"></i>}
            >
              Change Password
            </MenuItem>
            <MenuItem
              onClick={logout}
              icon={<i className="fa fa-right-from-bracket"></i>}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}

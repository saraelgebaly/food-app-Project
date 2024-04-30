import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import toggler from '../../../../assets/images/3.png'

export default function SideBar() {
  const[isCollapsed, setisCollapsed] = useState(true)
  const toggleCollapsed = () => {
    setisCollapsed(!isCollapsed)
  }
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <>
 <div className='sidebar-container sticky-top'>
 <Sidebar collapsed={isCollapsed}>
  <Menu>
    <img  onClick={toggleCollapsed} className='toggle w-75 mx-2' src={toggler}/>
    <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to="/dashboard" />}>Home</MenuItem>
    <MenuItem icon={<i className='fa fa-user-group'></i>} component={<Link to="/dashboard/users" />}>Users</MenuItem>
    <MenuItem icon={<i className='fa fa-utensils'></i>} component={<Link to="/dashboard/recipes" />}>Recipes</MenuItem>
    <MenuItem icon={<i className='fa fa-calendar-days'></i>} component={<Link to="/dashboard/categories" />}>Categories</MenuItem>
    <MenuItem  icon={<i className='fa fa-lock'></i>}>Change Password</MenuItem>
    <MenuItem onClick={logout} icon={<i className="fa fa-right-from-bracket"></i>}>Logout</MenuItem>
  </Menu>
</Sidebar>
 </div>
    
    </>
  )
}

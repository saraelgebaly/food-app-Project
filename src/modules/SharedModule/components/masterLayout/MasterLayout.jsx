import React from 'react'
import SideBar from '../sideBar/SideBar'
import Navbar from '../navbar/Navbar'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'
import headerLogo from '../../../../assets/images/home-avatar.svg'

export default function MasterLayout({loginData}) {
  return (
    
      <div className='d-flex' >
        <div>
          <SideBar/>
        </div>
        <div className='w-100'>
          <Navbar loginData ={loginData}/>
        
          <Outlet/>
         
        </div>
      </div>
  
  )
}

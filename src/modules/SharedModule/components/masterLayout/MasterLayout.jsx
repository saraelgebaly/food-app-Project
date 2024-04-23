import React from 'react'
import SideBar from '../sideBar/SideBar'
import Navbar from '../navbar/Navbar'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'

export default function MasterLayout({loginData}) {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3'>
          <SideBar/>
        </div>
        <div className='col-md-9'>
          <Navbar loginData ={loginData}/>
          <Header/>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

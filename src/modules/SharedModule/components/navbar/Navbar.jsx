import React from 'react'
import navLogo from '../../../../assets/images/avatar.png'

export default function Navbar({loginData})
 {

  return (
   <>
  <nav className="navbar navbar-expand-lg nav">
  <div className="container-fluid">
  <form className="d-flex" role="search">
      <i className="fa fa-search position-absolute z-1 m-2" ></i>
        <input className="form-control px-5 position-relative" type="search" placeholder="Search Here " aria-label="Search"/>
      </form> 
     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item p-2">
          <img src={navLogo}/>
        </li>
        <li className="nav- p-2">
          <a className="nav-link"> {loginData?.userName} </a>
        </li>
        <li className="nav-item d-flex justify-content-center align-items-center p-2">
          <i className='fa fa-bell'></i>
        </li>
       
      </ul>
      
    </div>
  </div>
</nav>
   </>
  )
}

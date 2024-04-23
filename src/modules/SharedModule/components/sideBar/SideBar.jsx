import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SideBar() {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div>
      <button onClick={logout} className='btn btn-success m-3'>Logout</button>
    </div>
  )
}

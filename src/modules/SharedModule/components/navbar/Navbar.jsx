import React from 'react'

export default function Navbar({loginData})
 {

  return (
    <div>
     {loginData?.userName}
    </div>
  )
}

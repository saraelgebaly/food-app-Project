import React, { useContext } from 'react'
import Header from '../../../SharedModule/components/header/Header'
import headerLogo from '../../../../assets/images/home-avatar.svg'
import RecipesListHeader from '../../../SharedModule/components/RecipesListHeader/RecipesListHeader'
import { AuthContext } from '../../../../Context/AuthContext'

export default function Dashboard() {
  let {loginData} =useContext(AuthContext)
  return (
  <>
    <Header
    title={`Welcome ${loginData.userName}!`}
    description={"This is a welcoming screen for the entry of the application , you can now see the options"}
    imgUrl = {headerLogo}
  />
  <RecipesListHeader/>
  
  </>

  )
}

import React from 'react'
import Header from '../../../SharedModule/components/header/Header'
import headerLogo from '../../../../assets/images/home-avatar.svg'
import RecipesListHeader from '../../../SharedModule/components/RecipesListHeader/RecipesListHeader'

export default function Dashboard() {
  return (
  <>
    <Header
    title={"Welcome Upskilling!"}
    description={"This is a welcoming screen for the entry of the application , you can now see the options"}
    imgUrl = {headerLogo}
  />
  <RecipesListHeader/>
  
  </>

  )
}

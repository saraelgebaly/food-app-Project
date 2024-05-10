import React from "react";
import homeLogo from "../../../../assets/images/home-avatar.svg";
import RecipesListHeader from "../../../SharedModule/components/RecipesListHeader/RecipesListHeader";
import Header from "../../../SharedModule/components/header/Header";
import Navbar from "../../../SharedModule/components/navbar/Navbar";
import SideBar from "../../../SharedModule/components/sideBar/SideBar";
export default function Home({loginData}) {
  return (
    <>
      <div className="d-flex">
        <div>
          <SideBar loginData={loginData} />
        </div>
        <div className="w-100">
        <Navbar loginData={loginData} />

          <Header imgUrl={homeLogo} />
            <RecipesListHeader/>
        </div>
      </div>
    </>
  );
}

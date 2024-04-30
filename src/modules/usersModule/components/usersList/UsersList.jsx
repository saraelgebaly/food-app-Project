import React from "react";
import userLogo from '../../../../assets/images/header.png'
import Header from "../../../SharedModule/components/header/Header";
export default function UsersList() {
  return (
    <>
      <Header
        title={"Users list"}
        description={"You can now add your items that any user can order it from the Application and you can edit"}
        imgUrl = {userLogo}
      />
    </>
  );
}

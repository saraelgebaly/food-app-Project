import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import Loading from "../Loading/Loading";

export default function MasterLayout({ loginData }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading/>
      ) : (
        <div className="d-flex">
          <div>
            <SideBar loginData={loginData} />
          </div>
          <div className="w-100">
            <Navbar loginData={loginData} />

            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}

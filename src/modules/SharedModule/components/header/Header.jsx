import React from "react";

export default function Header({title, description, imgUrl}) {
  return (
    <>
      <div className="container-fluid header-container mx-1 my-3 px-5">
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="content">
            <h1 className="">{title} </h1>
            <p>
              {description}
            </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-center">
            <img src={imgUrl} alt="" />

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

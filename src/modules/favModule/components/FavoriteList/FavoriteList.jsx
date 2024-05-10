import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import { ToastContext } from "../../../../Context/ToastContext";
import favLogo from "../../../../assets/images/header.png";
import NoData from "../../../SharedModule/components/NoData/NoData";
import Header from "../../../SharedModule/components/header/Header";
import Loading from "../../../SharedModule/components/Loading/Loading";

export default function FavoriteList() {
  let { baseUrl, requestHeaders } = useContext(AuthContext);
  let { getToastValue } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);

  const [favsList, setFavsList] = useState([]);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const getFavsList = async (pageSize, pageNumber) => {
    try {
      const response = await axios.get(
        `${baseUrl}/userRecipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,

        {
          headers: requestHeaders,
        }
      );
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setFavsList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFav = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/userRecipe/${id}`, {
        headers: requestHeaders,
      });
      console.log(res.data);
      getToastValue("success", "Successfully deleted");
      getFavsList(6, 1);
    } catch (error) {
      getToastValue("error", error.response);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getFavsList(6, 1);
  }, []);
  return (
    <>
      <Header
        title={"Favorite items!"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={favLogo}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="row justify-content-center">
            {favsList.length > 0 ? (
              favsList.map((item) => (
                <div
                  key={item.id}
                  className="col-md-3 px-4 m-2 mt-5 fav-container shadow"
                >
                  <div className="d-flex justify-content-end p-3">
                    <button
                      className="btn-icon"
                      onClick={() => deleteFav(item.id)}
                    >
                      <i className="fa fa-heart text-success"></i>
                    </button>
                  </div>
                  <img
                    className="w-100"
                    src={
                      "https://upskilling-egypt.com:3006/" +
                      item.recipe.imagePath
                    }
                    alt="NoImage"
                  />
                  <h4>{item.recipe.name}</h4>
                  <p>{item.recipe.description}</p>
                </div>
              ))
            ) : (
              <NoData />
            )}
          </div>
          <nav
            aria-label="Page navigation example"
            className="d-flex justify-content-center"
          >
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link text-success" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {arrayOfPages.map((pageNo) => (
                <li
                  onClick={() => getFavsList(6, pageNo)}
                  className="page-item"
                >
                  <a className="page-link text-success">{pageNo}</a>
                </li>
              ))}

              <li className="page-item">
                <a className="page-link text-success" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

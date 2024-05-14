import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthContext";
import { ToastContext } from "../../../../Context/ToastContext";
import recipesLogo from "../../../../assets/images/header.png";
import nodata from "../../../../assets/images/no-data.png";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import NoData from "../../../SharedModule/components/NoData/NoData";
import Header from "../../../SharedModule/components/header/Header";
import Loading from "../../../SharedModule/components/Loading/Loading";

export default function RecipesList() {
  let { baseUrl, requestHeaders, loginData } = useContext(AuthContext);
  let { getToastValue } = useContext(ToastContext);

  const navigate = useNavigate();
  const [recipesList, setRecipesList] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [favsList, setFavsList] = useState([]);
  const [recipeId, setRecipeId] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeImg, setRecipeImg] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [nameValue, setNameValue] = useState([]);
  const [catValue, setCatValue] = useState([]);
  const [tagValue, setTagValue] = useState([]);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewClose = () => setShowViewDetails(false);
  const handleViewShow = (id, name, description, img) => {
    setRecipeImg(img);
    setRecipeDescription(description);
    setRecipeName(name);
    setRecipeId(id);
    setShowViewDetails(true);
  };
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id) => {
    setRecipeId(id);
    setShowDelete(true);
  };
  const getRecipesList = async (
    name,
    categoryId,
    tagId,
    pageSize,
    pageNumber
  ) => {
    try {
      const response = await axios.get(
        `${baseUrl}/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,

        {
          headers: requestHeaders,
          params: {
            name: name,
            tagId: tagId,
            categoryId: categoryId,
          },
        }
      );
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setRecipesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCategoriesList = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Category/?pageSize=30&pageNumber=1`,

        {
          headers: requestHeaders,
        }
      ); 
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTagsList = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/tag`,

        {
          headers: requestHeaders,
        }
      );
      setTagsList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getFavsList = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/userRecipe`,

        {
          headers: requestHeaders,
        }
      );

      setFavsList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const goToUpdateRecipe = (item) => {
    navigate("/dashboard/recipesData", { state: item });
  };

  const onDeleteSubmit = async () => {
    try {
      const response = await axios.delete(
        `${baseUrl}/Recipe/${recipeId}`,

        {
          headers: requestHeaders,
        }
      );
      getToastValue("success", "Successfully deleted Recipe");

      handleDeleteClose();
      getRecipesList();
    } catch (error) {
      getToastValue("error", error.response.data.message);
    }
  };
  const onViewSubmit = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/userRecipe`, data, {
        headers: requestHeaders,
      });
      getToastValue("success", "Successfully Added to Favorites");
      handleViewClose();
    } catch (error) {
      getToastValue("error", error.response.data.message);
    }
  };
  const gotToRecipeData = () => {
    navigate("/dashboard/recipesData");
  };
  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getRecipesList(input.target.value, catValue, tagValue, 5, 1);
  };
  const getCatValue = (input) => {
    setCatValue(input.target.value);
    getRecipesList(nameValue, input.target.value, tagValue, 5, 1);
  };
  const getTagValue = (input) => {
    setTagValue(input.target.value);
    getRecipesList(nameValue, catValue, input.target.value, 5, 1);
  };
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getRecipesList("", "", "", 5, 1);

    getCategoriesList();
    getTagsList();
    getFavsList();
  }, []);
  return (
    <>
      <Header
        title={"Recipes list"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={recipesLogo}
      />
      <Modal show={showViewDetails} onHide={handleViewClose}>
        <Modal.Header closeButton>
          <h3>Recipe Details</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img
              className="w-50"
              src={"https://upskilling-egypt.com:3006/" + recipeImg}
              alt=""
            />
          </div>
          <h4>{recipeName}</h4>
          <p>{recipeDescription}</p>
        </Modal.Body>
        {loginData.userGroup == "SystemUser" ? (
          <Modal.Footer>
            <Button
              onClick={() => onViewSubmit({ recipeId: recipeId })}
              variant="success"
            >
              Favorite
            </Button>
          </Modal.Footer>
        ) : (
          ""
        )}
      </Modal>
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Body>
          <DeleteData deleteItem={"Recipe"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onDeleteSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container-fluid p-4 ">
          <div className="row">
            <div className="col-md-6">
              <h3>Recipes Table Details</h3>
              <p>You can check all details</p>
            </div>
            <div className="col-md-6  d-flex justify-content-end">
              {loginData.userGroup == "SuperAdmin" ? (
                <button
                  onClick={gotToRecipeData}
                  className="btn btn-success py-0 px-4 m-3"
                >
                  Add New Recipe
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="filteration my-3">
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="search by recipe name..."
                  onChange={getNameValue}
                />
              </div>
              <div className="col-md-3">
                <select className="form-control" onChange={getCatValue}>
                  <option value="">Search by Category</option>
                  {categoriesList.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <select className="form-control" onChange={getTagValue}>
                  <option value="">Search by Tag</option>
                  {tagsList.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="categories-body">
      <ul className="responsive-table-categories">
        <li className="table-header">
          <div className="col col-1">#</div>
          <div className="col col-2">Name</div>
          <div className="col col-3">Image</div>
          <div className="col col-4">Price</div>
          <div className="col col-5">Category</div>
          <div className="col col-6">Tag</div>
          <div className="col col-7"></div>
        </li>
      </ul>

      <ul className="responsive-table-categories">
        
        {recipesList.length > 0 ? (
                recipesList.map((item, index) => (
                  <li className="table-row">
                  <div className="col col-1" data-label="#">{index + 1}</div>
                  <div className="col col-2" data-label="Name :">{item.name}</div>
                  <div className="col col-3" data-label="Image :">{item.imagePath ? (
                        <img
                          className="recipes-img"
                          src={
                            "https://upskilling-egypt.com:3006/" +
                            item.imagePath
                          }
                          alt=""
                        />
                      ) : (
                        <img className="recipes-img" src={nodata} alt="" />
                      )}</div>
                  <div className="col col-4" data-label="Price :">{item.price}</div>
                  <div className="col col-5" data-label="Category :">{item.category[0]?.name}</div>
                  <div className="col col-6" data-label="Tag :">{item.tag.name}</div>
                  <div className="col col-7" data-label="">
                    
                  {loginData.userGroup == "SuperAdmin" ? (
                      <td>
                        <button
                          className="btn-icon"
                          onClick={() => goToUpdateRecipe(item)}
                        >
                          <i className="fa fa-edit mx-2 text-success"></i>
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() => handleDeleteShow(item.id)}
                        >
                          <i className="fa fa-trash text-danger"></i>
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() =>
                            handleViewShow(
                              item.id,
                              item.name,
                              item.description,
                              item.imagePath
                            )
                          }
                        >
                          <i className="fa fa-eye mx-2 text-primary"></i>
                        </button>
                      </td>
                    ) : loginData.userGroup == "SystemUser" ? (
                      <td>
                        <button
                          className="btn-icon"
                          onClick={() =>
                            handleViewShow(
                              item.id,
                              item.name,
                              item.description,
                              item.imagePath
                            )
                          }
                        >
                          <i className="fa fa-eye mx-2 text-primary"></i>
                        </button>
                      </td>
                    ) : (
                      ""
                    )}
                  </div>
                  </li>

                ))): (<NoData/>)}
         
      </ul>
      
    </div>
          {/* <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Tag</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {recipesList.length > 0 ? (
                recipesList.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row"> {index + 1} </th>
                    <td>{item.name}</td>
                    <td>
                      {item.imagePath ? (
                        <img
                          className="recipes-img"
                          src={
                            "https://upskilling-egypt.com:3006/" +
                            item.imagePath
                          }
                          alt=""
                        />
                      ) : (
                        <img className="recipes-img" src={nodata} alt="" />
                      )}
                    </td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>{item.category[0]?.name}</td>
                    <td>{item.tag.name}</td>

                    {loginData.userGroup == "SuperAdmin" ? (
                      <td>
                        <button
                          className="btn-icon"
                          onClick={() => goToUpdateRecipe(item)}
                        >
                          <i className="fa fa-edit mx-2 text-success"></i>
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() => handleDeleteShow(item.id)}
                        >
                          <i className="fa fa-trash text-danger"></i>
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() =>
                            handleViewShow(
                              item.id,
                              item.name,
                              item.description,
                              item.imagePath
                            )
                          }
                        >
                          <i className="fa fa-eye mx-2 text-primary"></i>
                        </button>
                      </td>
                    ) : loginData.userGroup == "SystemUser" ? (
                      <td>
                        <button
                          className="btn-icon"
                          onClick={() =>
                            handleViewShow(
                              item.id,
                              item.name,
                              item.description,
                              item.imagePath
                            )
                          }
                        >
                          <i className="fa fa-eye mx-2 text-primary"></i>
                        </button>
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                ))
              ) : (
                <NoData />
              )}
            </tbody>
          </table> */}
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
                  onClick={() =>
                    getRecipesList(nameValue, catValue, tagValue, 5, pageNo)
                  }
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

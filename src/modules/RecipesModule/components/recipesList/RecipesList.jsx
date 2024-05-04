import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import recipesLogo from "../../../../assets/images/header.png";
import nodata from "../../../../assets/images/no-data.png";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import NoData from "../../../SharedModule/components/NoData/NoData";
import Header from "../../../SharedModule/components/header/Header";

export default function RecipesList() {
  const navigate = useNavigate();
  const [recipesList, setRecipesList] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [recipeId, setRecipeId] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [nameValue, setNameValue] = useState([]);
  const [catValue, setCatValue] = useState([]);
  const [tagValue, setTagValue] = useState([]);
  const [arrayOfPages, setArrayOfPages] = useState([]);

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
        `https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
        "https://upskilling-egypt.com:3006/api/v1/tag",

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTagsList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onDeleteSubmit = async () => {
    try {
      const response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Successfully deleted Recipe");

      handleDeleteClose();
      getRecipesList();
    } catch (error) {
      toast.error(error.response.message);
    }
  };
  const gotToRecipeData = () => {
    navigate("/dashboard/recipesData");
  };
  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getRecipesList(input.target.value, catValue, tagValue,5,1);
  };
  const getCatValue = (input) => {
    setCatValue(input.target.value);
    getRecipesList(nameValue, input.target.value, tagValue,5,1);
  };
  const getTagValue = (input) => {
    setTagValue(input.target.value);
    getRecipesList(nameValue, catValue, input.target.value,5,1);
  };
  useEffect(() => {
    getRecipesList("","","",5,1);
    getCategoriesList();
    getTagsList();
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

      <div className="container-fluid p-4 ">
        <div className="row">
          <div className="col-md-6">
            <h3>Recipes Table Details</h3>
            <p>You can check all details</p>
          </div>
          <div className="col-md-6  d-flex justify-content-end">
            <button
              onClick={gotToRecipeData}
              className="btn btn-success py-0 px-4 m-3"
            >
              Add New Recipe
            </button>
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
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Tag</th>
              <th scope="col">Action</th>
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
                          "https://upskilling-egypt.com:3006/" + item.imagePath
                        }
                        alt=""
                      />
                    ) : (
                      <img className="recipes-img" src={nodata} alt="" />
                    )}
                  </td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.category.name}</td>
                  <td>{item.tag.name}</td>
                  <td>
                    <i className="fa fa-edit mx-2 text-success"></i>
                    <i
                      onClick={() => handleDeleteShow(item.id)}
                      className="fa fa-trash text-danger"
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </table>
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
    </>
  );
}

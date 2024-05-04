import React, { useEffect, useState } from "react";
import categoriesLogo from "../../../../assets/images/header.png";
import Header from "../../../SharedModule/components/header/Header";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import { toast } from "react-toastify";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [nameValue, setNameValue] = useState([])
  const [arrayOfPages, setArrayOfPages] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDelete, setShowDelete] = useState(false);

  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id) => {
    setCategoryId(id);
    setShowDelete(true);
  };
  const [showEdit, setShowEdit] = useState(false);

  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = (id, name) => {
    setCategoryName(name);
    setCategoryId(id);
    setShowEdit(true);
  };
  const getCategoriesList = async (name, pageSize, pageNumber) => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            name: name,
          },
        }
      );
      setArrayOfPages(Array(response.data.totalNumberOfPages)
        .fill()
        .map((_, i) => i + 1)
      );
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Category/",
        data,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Successfully created category");
      handleClose();
      getCategoriesList();
    } catch (error) {
      toast.error(error.response.message);
    }
  };
  const onDeleteSubmit = async () => {
    try {
      const response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${categoryId}`,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Successfully deleted category");

      handleDeleteClose();
      getCategoriesList();
    } catch (error) {
      toast.error(error.response.message);
    }
  };
  const getCategoryById = async (i) => {
    try {
      const res = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Category/${categoryId}`,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onEditSubmit = async () => {
    // e.preventDefault();

    try {
      const response = await axios.put(
        `https://upskilling-egypt.com:3006/api/v1/Category/${categoryId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response);
      toast.success("Successfully Edit category");
      handleEditClose();
      getCategoriesList();
    } catch (error) {
      toast.error(error.response.message);
    }
  };
  const handleInput = (e) => {
    console.log(e.target.value);
  };
  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getCategoriesList(input.target.value,15,1);
  };
  useEffect(() => {
    getCategoriesList("",15,1);
    getCategoryById();
  }, []);

  return (
    <>
      <Header
        title={"Categories item"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={categoriesLogo}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h3>Add Category</h3>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="category name"
                {...register("name", {
                  required: "category name is required",
                })}
              />
            </div>
            {errors.name && (
              <p className="alert alert-danger">{errors.name.message} </p>
            )}

            <button className="btn btn-success">save</button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Body>
          <DeleteData deleteItem={"Category"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onDeleteSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <h3>Edit Category</h3>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onEditSubmit)}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                // value={categoryName}
                onChange={handleInput}
                {...register("name", {
                  required: "category name is required",
                })}
              />
            </div>
            {errors.name && (
              <p className="alert alert-danger">{errors.name.message} </p>
            )}

            <button className="btn btn-warning">save</button>
          </form>
        </Modal.Body>
      </Modal>
      <div className="container-fluid p-4 ">
        <div className="row">
          <div className="col-md-6">
            <h3>Categories Table Details</h3>
            <p>You can check all details</p>
          </div>
          <div className="col-md-6  d-flex justify-content-end">
            <button
              onClick={handleShow}
              className="btn btn-success py-0 px-4 m-3"
            >
              Add New Category
            </button>
          </div>
        </div>
        <div className="fileration my-3">
          <div className="row">
            <div className="col-md-12">
              <input
                type="text"
                className="form-control"
                placeholder="search by category name..."
                onChange={getNameValue}
              />
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Date Creation</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList.length > 0 ? (
              categoriesList.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row"> {index + 1} </th>
                  <td>{item.name} </td>
                  <td>{item.creationDate} </td>
                  <td>
                    <i
                      onClick={() => handleEditShow(item.id, item.name)}
                      className="fa fa-edit mx-2 text-success"
                    ></i>
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
                  getCategoriesList(nameValue,15,pageNo)
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

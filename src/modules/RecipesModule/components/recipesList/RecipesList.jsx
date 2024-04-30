import React, { useEffect, useState } from 'react'
import recipesLogo from '../../../../assets/images/header.png'
import Header from '../../../SharedModule/components/header/Header'
import axios from 'axios';
import NoData from '../../../SharedModule/components/NoData/NoData';
import nodata from "../../../../assets/images/no-data.png";
import { toast } from 'react-toastify';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteData from '../../../SharedModule/components/DeleteData/DeleteData';


export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [recipeId, setRecipeId] = useState("");


  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id) => {
    setRecipeId(id);
    setShowDelete(true);
  };

  const getRecipesList = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1",

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setRecipesList(response.data.data);
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
  useEffect(() => {
    getRecipesList();
  }, []);
  return (
 
 <>

    <Header
        title={"Recipes list"}
        description={"You can now add your items that any user can order it from the Application and you can edit"}
        imgUrl = {recipesLogo}
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
              className="btn btn-success py-0 px-4 m-3"
            >
              Add New Recipe
            </button>
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
                  <td>{item.imagePath ? (
                    <img className='recipes-img' src={"https://upskilling-egypt.com:3006/"+ item.imagePath} alt="" />
                  )
                  
                :(
                  <img className='recipes-img'  src={nodata} alt="" />
                )
                }
                  
                  
                  </td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.category.name}</td>
                  <td>{item.tag.name}</td>
                  <td>
                    <i className="fa fa-edit mx-2"></i>
                    <i
                   onClick={()=> handleDeleteShow(item.id)}
                      className="fa fa-trash"
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </table>
      </div>
 
 </>
  )
}

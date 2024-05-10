import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthContext";
import { ToastContext } from "../../../../Context/ToastContext";
import RecipesListHeader from "../../../SharedModule/components/RecipesListHeader/RecipesListHeader";

export default function RecipesData() {
  let {baseUrl, requestHeaders} = useContext(AuthContext)
  let { getToastValue } = useContext(ToastContext);

  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [recipeId, setRecipeId] = useState(0);

  const location = useLocation();
  const recipe = location.state;

 

  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const getCategoriesList = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Category/?pageSize=10&pageNumber=1`,

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
  const setValueInput = ()=>{
    if(recipe){
      setIsUpdate(true)
      setRecipeId(recipe.id)
      reset({
        name : recipe.name,
        description : recipe.description,
        price : recipe.price,
        tagId : recipe.tag.id,
        categoriesIds : recipe.category[0]?.id,
        recipeImage: recipe.recipeImage
      })
    }
  }
  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("tagId", data.tagId);
    formData.append("recipeImage", data.recipeImage[0]);
    formData.append("categoriesIds", data.categoriesIds);

    return formData;
  };
  const onEditSubmit = async(data)=>{
    const recipeFormData = appendToFormData(data);

    try {
      const response = await axios.put(
        `${baseUrl}/Recipe/${recipeId}`,recipeFormData,
        {
          headers: requestHeaders,
        }
      );
      console.log(response);
      getToastValue("success","Successfully Edit Recipe");
      navigate("/dashboard/recipes");
    } catch (error) {
      getToastValue("error", error.response.data.message);
    }
  }

  const onSubmit = async (data) => {
    const recipeFormData = appendToFormData(data);
    try {
      const res = await axios.post(
        `${baseUrl}/Recipe`,
        recipeFormData,

        {
          headers: requestHeaders,
        }
      );

      getToastValue("success",res.data.message);
      navigate("/dashboard/recipes");
    } catch (error) {
      getToastValue("error", error.response.data.message);
    }
  };
  useEffect(() => {
    getCategoriesList();
    getTagsList();
    setValueInput()
    
  }, []);

  return (
    <>
      <RecipesListHeader />
      <div className="container-fluid m-3 p-3">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 ">
            <form onSubmit={handleSubmit(!isUpdate? onSubmit:onEditSubmit)}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Recipe name"
                  {...register("name", {
                    required: "Recipe name is required",
                  })}
                />
                
              </div>
              {errors.name && (
                <p className="alert alert-danger">{errors.name.message} </p>
              )}

              <div className="input-group mb-3">
                <select
                  className="form-control"
                  {...register("tagId", {
                    required: "Tag is required",
                  })}
                >
                  <option value="">Tag</option>

                  {tagsList.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.tagId && (
                <p className="alert alert-danger">{errors.tagId.message} </p>
              )}

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Price"
                  {...register("price", {
                    required: "Price is required",
                  })}
                />
              </div>
              {errors.price && (
                <p className="alert alert-danger">{errors.price.message}</p>
              )}

              <div className="input-group mb-3">
                <select
                  className="form-control"
                  {...register("categoriesIds", {
                    required: "Categoriesis required",
                  })}
                >
                  <option value="">Category</option>
                  {categoriesList.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.categoriesIds && (
                <p className="alert alert-danger">
                  {errors.categoriesIds.message}
                </p>
              )}

              <div className="input-group mb-3">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Description Recipe "
                  {...register("description", {
                    required: "description is required",
                  })}
                />
              </div>

              {errors.description && (
                <p className="alert alert-danger">
                  {errors.description.message}
                </p>
              )}
              <div className="input-group mb-3">
                <input
                  type="file"
                  className="form-control"
                  {...register("recipeImage", {
                    required: "Recipe Image is required",
                  })}
                />
              </div>
              {errors.recipeImage && (
                <p className="alert alert-danger">
                  {errors.recipeImage.message}
                </p>
              )}
              <div className="text-end">
                <button className="btn btn-success  ">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

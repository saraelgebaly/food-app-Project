import React from "react";
import { useNavigate } from "react-router-dom";

export default function RecipesListHeader() {
  const navigate = useNavigate();
  const goToRecipesList = () => {
    navigate("/dashboard/recipes");
  };
  return (
    <div className="recipe-header-container p-4 m-4">
      <div className="row">
        <div className="col-md-6">
          <h5>
            Fill the <span className="text-success">Recipes</span>!
          </h5>
          <p>
            you can now fill the meals easily using the table and form , click
            here and sill it with the table !
          </p>
        </div>
        <div className="col-md-6 text-end">
          <button onClick={goToRecipesList} className="btn btn-success mx-5">
            Fill Recipes
            <i className="fa fa-arrow-right p-2" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

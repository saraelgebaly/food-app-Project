import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import VerifyAccount from "./modules/Authentication/components/VerifyAccount/VerifyAccount";
import ForgetPass from "./modules/Authentication/components/forgetPass/ForgetPass";
import Login from "./modules/Authentication/components/login/Login";
import Register from "./modules/Authentication/components/register/Register";
import Dashboard from "./modules/HomeModule/components/dashboard/Dashboard";
import Home from "./modules/HomeModule/components/dashboard/Home";
import RecipesData from "./modules/RecipesModule/components/RecipesData/RecipesData";
import RecipesList from "./modules/RecipesModule/components/recipesList/RecipesList";
import AuthLayout from "./modules/SharedModule/components/authLayout/AuthLayout";
import MasterLayout from "./modules/SharedModule/components/masterLayout/MasterLayout";
import NotFound from "./modules/SharedModule/components/notFound/NotFound";
import ProtectedRoute from "./modules/SharedModule/components/protectedRoute/ProtectedRoute";
import CategoriesList from "./modules/categoriesModule/components/categoriesList/CategoriesList";
import FavoriteList from "./modules/favModule/components/FavoriteList/FavoriteList";
import UsersList from "./modules/usersModule/components/usersList/UsersList";
import PrivateRoute from "./modules/SharedModule/components/PrivateRoute/PrivateRoute";
import Header from "./modules/SharedModule/components/header/Header";
import ResetPass from "./modules/Authentication/components/resetPass/ResetPass";
import { AuthContext } from "./Context/AuthContext";

function App() {
  let { loginData, saveLoginData } = useContext(AuthContext);

  const login = localStorage.getItem("token");

  let routes = createHashRouter([
    {
      path: "Dashboard",
      element: (
        <ProtectedRoute loginData={loginData}>
          <MasterLayout loginData={loginData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "home", element: <Dashboard /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "recipesData", element: <RecipesData /> },
        {
          path: "categories",
          element: <PrivateRoute><CategoriesList /></PrivateRoute>,
        },
        {
          path: "users",
          element: (
            <PrivateRoute loginData={loginData}>
              <UsersList />
            </PrivateRoute>
          ),
        },
        { path: "fav", element: <FavoriteList /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: login ? (
            <Home loginData={loginData} />
          ) : (
            <Login saveLoginData={saveLoginData} />
          ),
        },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "forgetPass", element: <ForgetPass /> },
        { path: "resetPass", element: <ResetPass /> },
        { path: "verifyAccount", element: <VerifyAccount /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;

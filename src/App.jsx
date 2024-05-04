import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MasterLayout from "./modules/SharedModule/components/masterLayout/MasterLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./modules/SharedModule/components/authLayout/AuthLayout";
import NotFound from "./modules/SharedModule/components/notFound/NotFound";
import Dashboard from "./modules/HomeModule/components/dashboard/Dashboard";
import RecipesList from "./modules/RecipesModule/components/recipesList/RecipesList";
import CategoriesList from "./modules/categoriesModule/components/categoriesList/CategoriesList";
import UsersList from "./modules/usersModule/components/usersList/UsersList";
import Login from "./modules/Authentication/components/login/Login";
import Register from "./modules/Authentication/components/register/Register";
import ForgetPass from "./modules/Authentication/components/forgetPass/ForgetPass";
import ResetPass from "./modules/Authentication/components/resetPass/ResetPass";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./modules/SharedModule/components/protectedRoute/ProtectedRoute";
import RecipesData from "./modules/RecipesModule/components/RecipesData/RecipesData";
import VerifyAccount from "./modules/Authentication/components/VerifyAccount/VerifyAccount";

function App() {
  let [loginData, setLoginData] = useState(null);
  let saveLoginData = () => {
    let encodedToken = localStorage.getItem("token");
    let decodedToken = jwtDecode(encodedToken);
    setLoginData(decodedToken);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);
  const login = localStorage.getItem("token")
  
  let routes = createBrowserRouter([
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
        { path: "categories", element: <CategoriesList /> },
        { path: "users", element: <UsersList /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path:"/", element:login? <MasterLayout/>: <Login  saveLoginData={saveLoginData} /> },
        { path: "login", element: login? <MasterLayout/>: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "forgetPass", element: <ForgetPass /> },
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

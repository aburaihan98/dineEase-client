import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout";
import AddFoodItem from "../pages/AddFoodItem";
import AllFoods from "../pages/AllFoods";
import FoodPurchase from "../pages/FoodPurchase";
import Gallery from "../pages/Gallery";
import Login from "../pages/Login";
import MyFoods from "../pages/MyFoods";
import MyOrders from "../pages/MyOrders";
import Register from "../pages/Register";
import SingleFood from "../pages/SingleFood";
import UpdateFood from "../pages/UpdateFood";
import Root from "../Root";
import ErrorPage from "./../ErrorPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
      },
      {
        path: "/all-foods",
        element: <AllFoods />,
      },
      {
        path: "/foods/:id",
        element: <SingleFood />,
      },
      {
        path: "/purchase/:id",
        element: (
          <PrivateRoute>
            <FoodPurchase />
          </PrivateRoute>
        ),
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/my-foods",
        element: <MyFoods />,
      },
      {
        path: "/add-food",
        element: <AddFoodItem />,
      },
      {
        path: "/update-food/:id",
        element: <UpdateFood />,
      },
      {
        path: "/my-orders",
        element: <MyOrders />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;

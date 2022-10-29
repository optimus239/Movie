import React from "react";
import { useRoutes } from "react-router-dom";
import AdminLayout from "../layouts/adminLayout/AdminLayout";
import Films from "../pages/Admin/Film/Films";

import MainLayout from "../layouts/MainLayout";
import NotFound from "../layouts/NotFound";
import Checkout from "../pages/checkout/Checkout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import MovieDetail from "../pages/movieDetail/MovieDetail";
import Register from "../pages/register/Register";
import AddFilm from "../pages/Admin/Film/AddFilm";

const Routers = () => {
  const routing = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "home",
          element: <Home />,
        },
        { path: "detail/:movieIds", element: <MovieDetail /> },
        {
          path: "ticketroom/:movieIds",
          element: <Checkout />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <Films />,
        },
        {
          path: "films",
          element: <Films />,
        },
        {
          path: "films/addfilm",
          element: <AddFilm />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return routing;
};

export default Routers;

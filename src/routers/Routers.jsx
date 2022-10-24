import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/home/Home";

const Routers = () => {
  const routing = useRoutes([
    {
      path: "/home",
      element: <Home />,
    },
  ]);
  return routing;
};

export default Routers;

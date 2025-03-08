import React from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../Components/Breadcrumb/Breadcrumb";

const Home = () => {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full p-5 ">
        <Breadcrumb />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;

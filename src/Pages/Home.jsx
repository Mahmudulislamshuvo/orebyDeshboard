import React from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;

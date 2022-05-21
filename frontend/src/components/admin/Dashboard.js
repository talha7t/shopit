import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MetaData } from "../commons/MetaData";
import Loader from "../commons/Loader";
import SideBar from "./SideBar";

const Dashboard = () => {
  return (
    <>
      <SideBar />

      <section className="admin-main-section">
        <div className="text">Dashboard Sidebar</div>
      </section>
    </>
  );
};

export default Dashboard;

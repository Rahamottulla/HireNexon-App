//frontend/src/layouts/HomeLayout/HomeLayout.js
import React from "react";
import { Outlet } from "react-router-dom"; // <-- important
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./HomeLayout.css";


const HomeLayout = () => {
  return (
    <div className="home-layout">
      <Header />
      <main>
        <Outlet /> {/* <-- This renders the nested route pages like Home, Jobs */}
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
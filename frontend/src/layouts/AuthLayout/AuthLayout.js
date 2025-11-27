//frontend/src/layouts/AuthLayout/AuthLayout.js
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./AuthLayout.css";

const AuthLayout = () => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "80vh" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default AuthLayout;

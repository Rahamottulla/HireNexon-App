import { Outlet } from "react-router-dom";
import Header from "@/shared/components/common/Header";
import Footer from "@/shared/components/common/Footer";

const AuthLayout = () => {
  return (
    <>
      <Header />
      <div className="min-h-[80vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default AuthLayout;

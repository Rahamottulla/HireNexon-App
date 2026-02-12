import { Outlet } from "react-router-dom";
import Header from "@/shared/components/common/Header";
import Footer from "@/shared/components/common/Footer";

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;

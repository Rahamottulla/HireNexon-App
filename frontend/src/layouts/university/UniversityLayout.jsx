import { Outlet } from "react-router-dom";
import UniversityNavbar from "./UniversityNavbar";
import UniversitySidebar from "./UniversitySidebar";
import MobileSidebar from "./UniversitySidebar";

const UniversityLayout = () => {
  return (
    <div className="flex h-screen">
      <UniversitySidebar />
      <MobileSidebar />
      
      <div className="flex-1 flex flex-col">
        <UniversityNavbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UniversityLayout;

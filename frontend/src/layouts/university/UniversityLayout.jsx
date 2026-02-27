import { Outlet } from "react-router-dom";
import UniversitySidebar from "./UniversitySidebar";
import UniversityNavbar from "./UniversityNavbar";

const UniversityLayout = () => {
  return (
    <div className="flex h-screen">
      <UniversitySidebar />
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

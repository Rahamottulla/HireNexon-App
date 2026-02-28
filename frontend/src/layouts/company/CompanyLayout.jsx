//frontend/src/layouts/company/CompanyLayout.jsx
import CompanyNavbar from "./CompanyNavbar";
import CompanySidebar from "./CompanySidebar";
import MobileSidebar from "./MobileSidebar";

const CompanyLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <CompanySidebar />
      <MobileSidebar />

      <div className="flex-1 flex flex-col">
        <CompanyNavbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default CompanyLayout;

import UsersTable from "../components/UsersTable";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        HireNexon Admin Dashboard
      </h1>

      <UsersTable />
    </div>
  );
};

export default AdminDashboard;

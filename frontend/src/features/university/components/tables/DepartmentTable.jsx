import DataTable from "./DataTable";

const DepartmentTable = ({ departments }) => {
  const columns = [
    { header: "Department Name", accessor: "name" },
    { header: "Students Count", accessor: "count" },
  ];

  return <DataTable columns={columns} data={departments} />;
};

export default DepartmentTable;
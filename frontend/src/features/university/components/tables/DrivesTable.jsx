import DataTable from "./DataTable";

const DrivesTable = ({ drives }) => {
  const columns = [
    { header: "Company", accessor: "company" },
    { header: "Date", accessor: "date" },
    { header: "Status", accessor: "status" },
  ];

  return <DataTable columns={columns} data={drives} />;
};

export default DrivesTable;
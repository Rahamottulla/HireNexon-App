import DataTable from "./DataTable";

const PlacementTable = ({ placements }) => {
  const columns = [
    { header: "Student", accessor: "student" },
    { header: "Company", accessor: "company" },
    { header: "Package", accessor: "package" },
  ];

  return <DataTable columns={columns} data={placements} />;
};

export default PlacementTable;
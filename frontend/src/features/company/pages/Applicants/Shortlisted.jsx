import ApplicantTable from "./ApplicantTable";
import useShortlisted from "@/features/company/hooks/useShortlisted";

const Shortlisted = () => {
  const { shortlisted } = useShortlisted();

  return (
    <div className="p-6">
      <ApplicantTable data={shortlisted} />
    </div>
  );
};

export default Shortlisted;

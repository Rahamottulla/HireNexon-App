import CandidateTable from "@/features/company/components/tables/CandidateTable";
import useCandidates from "@/features/company/hooks/useCandidates";

const ManageCandidates = () => {
  const { candidates } = useCandidates();

  return (
    <div className="p-6">
      <CandidateTable data={candidates} />
    </div>
  );
};

export default ManageCandidates;
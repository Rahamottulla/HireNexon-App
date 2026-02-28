import JobForm from "@/features/company/components/forms/JobForm";

const EditJob = () => {
  return (
    <div className="p-6 max-w-2xl">
      <JobForm mode="edit" />
    </div>
  );
};

export default EditJob;
import useOrganization from "@/features/company/hooks/useOrganization";

const Organization = () => {
  const { org } = useOrganization();

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Organization Details
      </h2>
      <p>Name: {org?.name}</p>
      <p>Industry: {org?.industry}</p>
    </div>
  );
};

export default Organization;
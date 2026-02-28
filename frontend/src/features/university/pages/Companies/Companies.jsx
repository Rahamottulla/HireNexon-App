import UniversityLayout from "@/features/university/components/layout/UniversityLayout";
import useCompanies from "@/features/university/hooks/useCompanies";
import Loader from "@/features/university/components/ui/Loader";
import CompanyList from "./CompanyList";

const Companies = () => {
  const { companies, loading, error } = useCompanies();

  return (
    <UniversityLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Partner Companies
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track recruitment partnerships.
          </p>
        </div>

        {loading && <Loader />}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl">
            {error}
          </div>
        )}

        {!loading && companies && (
          <CompanyList companies={companies} />
        )}

      </div>
    </UniversityLayout>
  );
};

export default Companies;
import UniversityLayout from "@/features/university/components/layout/UniversityLayout";

const PlacementReports = ({ title, description }) => {
  return (
    <UniversityLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {title}
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-600">
            {description}
          </p>
        </div>
      </div>
    </UniversityLayout>
  );
};

export default PlacementReports;
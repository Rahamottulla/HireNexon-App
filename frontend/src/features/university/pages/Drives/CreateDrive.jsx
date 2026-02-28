import UniversityLayout from "@/features/university/components/layout/UniversityLayout";
import useCreateDrive from "@/features/university/hooks/useCreateDrive";

const CreateDrive = () => {
  const { form, handleChange, handleSubmit, loading } = useCreateDrive();

  return (
    <UniversityLayout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm mt-8 space-y-6">

        <h1 className="text-2xl font-bold">
          Create New Drive
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="text-sm font-medium text-gray-600">
                Company ID
              </label>
              <input
                type="text"
                value={form.companyId}
                onChange={(e) => handleChange("companyId", e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Role
              </label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => handleChange("role", e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Drive Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Package (LPA)
              </label>
              <input
                type="number"
                value={form.package}
                onChange={(e) => handleChange("package", e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition text-sm font-medium disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Drive"}
            </button>
          </div>

        </form>
      </div>
    </UniversityLayout>
  );
};

export default CreateDrive;
import UniversityLayout from "@/features/university/components/layout/UniversityLayout";
import useUpdateUniversityProfile from "@/features/university/hooks/useUpdateUniversityProfile";
import Loader from "@/features/university/components/ui/Loader";

const EditUniversityProfile = () => {
  const {
    form,
    handleChange,
    handleSubmit,
    loading,
    error,
  } = useUpdateUniversityProfile();

  return (
    <UniversityLayout>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm mt-8 space-y-6">

        <h1 className="text-2xl font-bold">
          Edit University Profile
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl">
            {error}
          </div>
        )}

        {loading && <Loader />}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="University Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Established Year"
              value={form.establishedYear}
              onChange={(e) =>
                handleChange("establishedYear", e.target.value)
              }
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <textarea
            rows={4}
            placeholder="About University"
            value={form.description}
            onChange={(e) =>
              handleChange("description", e.target.value)
            }
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition"
            >
              Update Profile
            </button>
          </div>

        </form>
      </div>
    </UniversityLayout>
  );
};

export default EditUniversityProfile;
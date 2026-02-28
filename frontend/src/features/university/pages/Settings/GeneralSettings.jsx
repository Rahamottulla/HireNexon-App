import useUpdateGeneralSettings from "@/features/university/hooks/useUpdateGeneralSettings";

const GeneralSettings = ({ data }) => {
  const { form, handleChange, handleSubmit, loading } =
    useUpdateGeneralSettings(data);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
      <h2 className="text-lg font-semibold">General Settings</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

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

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default GeneralSettings;
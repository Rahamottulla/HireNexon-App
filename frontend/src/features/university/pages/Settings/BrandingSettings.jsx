import useUpdateBrandingSettings from "@/features/university/hooks/useUpdateBrandingSettings";

const BrandingSettings = ({ data }) => {
  const { handleLogoUpload, loading } =
    useUpdateBrandingSettings();

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
      <h2 className="text-lg font-semibold">Branding Settings</h2>

      {data?.logo && (
        <img
          src={data.logo}
          alt="Logo"
          className="w-32 h-32 object-contain border rounded-xl"
        />
      )}

      <label className="bg-blue-600 text-white px-5 py-2.5 rounded-xl cursor-pointer text-sm font-medium hover:bg-blue-700 transition">
        {loading ? "Uploading..." : "Upload New Logo"}
        <input
          type="file"
          hidden
          onChange={(e) =>
            handleLogoUpload(e.target.files[0])
          }
        />
      </label>
    </div>
  );
};

export default BrandingSettings;
import useUploadUniversityLogo from "@/features/university/hooks/useUploadUniversityLogo";

const LogoUploadSection = ({ logo }) => {
  const { handleUpload, loading } = useUploadUniversityLogo();

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-6">
        University Logo
      </h2>

      <div className="flex flex-col md:flex-row md:items-center gap-6">

        {logo && (
          <img
            src={logo}
            alt="University Logo"
            className="w-32 h-32 object-contain border rounded-xl"
          />
        )}

        <label className="bg-blue-600 text-white px-5 py-2.5 rounded-xl cursor-pointer text-sm font-medium hover:bg-blue-700 transition">
          {loading ? "Uploading..." : "Upload Logo"}
          <input
            type="file"
            hidden
            onChange={(e) =>
              handleUpload(e.target.files[0])
            }
          />
        </label>

      </div>
    </div>
  );
};

export default LogoUploadSection;
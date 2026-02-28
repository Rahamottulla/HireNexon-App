import Button from "@/features/university/components/ui/Button";

const UniversityLogoUploadForm = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold mb-6">
        University Logo
      </h3>

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
        <p className="text-sm text-gray-500 mb-4">
          Upload your university logo (PNG, JPG)
        </p>
        <input type="file" className="hidden" id="logoUpload" />
        <label htmlFor="logoUpload">
          <Button>Choose File</Button>
        </label>
      </div>
    </div>
  );
};

export default UniversityLogoUploadForm;
import Button from "../ui/Button";

const StudentUploadForm = ({ onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-900">
        Upload Students
      </h2>

      <input
        type="file"
        accept=".csv,.xlsx"
        className="w-full border border-gray-200 rounded-xl p-3 text-sm"
      />

      <Button type="submit">Upload</Button>
    </form>
  );
};

export default StudentUploadForm;

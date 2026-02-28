import useBulkUploadStudents from "@/features/university/hooks/useBulkUploadStudents";
import Button from "@/features/university/components/ui/Button";

const BulkUploadModal = ({ open, onClose, onSuccess }) => {
  const {
    file,
    setFile,
    handleSubmit,
    loading,
    error,
  } = useBulkUploadStudents(onSuccess, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 space-y-6">

        <h2 className="text-xl font-semibold">
          Bulk Upload Students
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            className="w-full border rounded-xl p-3"
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!file || loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BulkUploadModal;
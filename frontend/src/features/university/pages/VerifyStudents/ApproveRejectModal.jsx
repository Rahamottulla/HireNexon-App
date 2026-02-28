import useApproveRejectStudent from "@/features/university/hooks/useApproveRejectStudent";
import Button from "@/features/university/components/ui/Button";

const ApproveRejectModal = ({
  student,
  actionType,
  onClose,
  onSuccess,
}) => {
  const {
    handleSubmit,
    loading,
    error,
  } = useApproveRejectStudent(student?._id, actionType, onSuccess, onClose);

  if (!student || !actionType) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6">

        <h2 className="text-lg font-semibold">
          {actionType === "approve"
            ? "Approve Student"
            : "Reject Student"}
        </h2>

        <p className="text-sm text-gray-600">
          Are you sure you want to {actionType}{" "}
          <strong>{student.name}</strong>?
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className={
              actionType === "approve"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }
          >
            {loading
              ? "Processing..."
              : actionType === "approve"
              ? "Approve"
              : "Reject"}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default ApproveRejectModal;
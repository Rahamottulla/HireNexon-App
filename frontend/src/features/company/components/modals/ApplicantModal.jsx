import Button from "../ui/Button";

const StudentModal = ({ open, student, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900">
          Student Details
        </h3>

        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p><strong>Name:</strong> {student?.name}</p>
          <p><strong>Department:</strong> {student?.department}</p>
          <p><strong>CGPA:</strong> {student?.cgpa}</p>
          <p><strong>Email:</strong> {student?.email}</p>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;

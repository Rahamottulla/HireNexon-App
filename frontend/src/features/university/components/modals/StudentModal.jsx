import Button from "@/features/university/components/ui/Button";

const StudentModal = ({ open, student, onClose }) => {
  if (!open || !student) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-xl">
        <h2 className="text-lg font-semibold mb-4">
          Student Details
        </h2>

        <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Department:</strong> {student.department}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Status:</strong> {student.status}</p>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;
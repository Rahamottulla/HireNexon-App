import useCreateStudent from "@/features/university/hooks/useCreateStudent";
import Button from "@/features/university/components/ui/Button";
import Input from "@/features/university/components/ui/Input";

const AddStudentModal = ({ open, onClose, onSuccess }) => {
  const {
    form,
    handleChange,
    handleSubmit,
    loading,
    error,
  } = useCreateStudent(onSuccess, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 space-y-6">

        <h2 className="text-xl font-semibold">
          Add New Student
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Input
              label="Full Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />

            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />

            <Input
              label="Department"
              value={form.department}
              onChange={(e) =>
                handleChange("department", e.target.value)
              }
              required
            />

            <Input
              label="CGPA"
              type="number"
              step="0.01"
              value={form.cgpa}
              onChange={(e) =>
                handleChange("cgpa", e.target.value)
              }
              required
            />

          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Student"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
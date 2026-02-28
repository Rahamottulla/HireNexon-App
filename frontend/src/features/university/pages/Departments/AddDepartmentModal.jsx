import useCreateDepartment from "@/features/university/hooks/useCreateDepartment";
import Button from "@/features/university/components/ui/Button";
import Input from "@/features/university/components/ui/Input";

const AddDepartmentModal = ({ open, onClose, onSuccess }) => {
  const {
    form,
    handleChange,
    handleSubmit,
    loading,
    error,
  } = useCreateDepartment(onSuccess, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 space-y-6">

        <h2 className="text-xl font-semibold">
          Add New Department
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <Input
            label="Department Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />

          <Input
            label="Head of Department"
            value={form.hod}
            onChange={(e) => handleChange("hod", e.target.value)}
            required
          />

          <Input
            label="Total Students"
            type="number"
            value={form.totalStudents}
            onChange={(e) =>
              handleChange("totalStudents", e.target.value)
            }
            required
          />

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Department"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddDepartmentModal;
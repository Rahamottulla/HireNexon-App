import { useEffect } from "react";
import useUpdateDepartment from "@/features/university/hooks/useUpdateDepartment";
import Button from "@/features/university/components/ui/Button";
import Input from "@/features/university/components/ui/Input";

const EditDepartmentModal = ({
  department,
  onClose,
  onSuccess,
}) => {
  const {
    form,
    setForm,
    handleChange,
    handleSubmit,
    loading,
    error,
  } = useUpdateDepartment(onSuccess, onClose);

  useEffect(() => {
    if (department) {
      setForm({
        name: department.name || "",
        hod: department.hod || "",
        totalStudents: department.totalStudents || "",
      });
    }
  }, [department, setForm]);

  if (!department) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 space-y-6">

        <h2 className="text-xl font-semibold">
          Edit Department
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={(e) =>
            handleSubmit(e, department._id)
          }
          className="space-y-5"
        >

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
              {loading ? "Updating..." : "Update Department"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditDepartmentModal;
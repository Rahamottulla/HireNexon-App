import { useEffect } from "react";
import useUpdateStudent from "@/features/university/hooks/useUpdateStudent";
import Button from "@/features/university/components/ui/Button";
import Input from "@/features/university/components/ui/Input";

const EditStudentModal = ({ student, onClose, onSuccess }) => {
  const {
    form,
    setForm,
    handleChange,
    handleSubmit,
    loading,
    error,
  } = useUpdateStudent(onSuccess, onClose);

  useEffect(() => {
    if (student) {
      setForm({
        name: student.name || "",
        email: student.email || "",
        department: student.department || "",
        cgpa: student.cgpa || "",
      });
    }
  }, [student, setForm]);

  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 space-y-6">

        <h2 className="text-xl font-semibold">
          Edit Student
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={(e) =>
            handleSubmit(e, student._id)
          }
          className="space-y-6"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Input
              label="Full Name"
              value={form.name}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
            />

            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
            />

            <Input
              label="Department"
              value={form.department}
              onChange={(e) =>
                handleChange("department", e.target.value)
              }
            />

            <Input
              label="CGPA"
              type="number"
              step="0.01"
              value={form.cgpa}
              onChange={(e) =>
                handleChange("cgpa", e.target.value)
              }
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
              {loading ? "Updating..." : "Update Student"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
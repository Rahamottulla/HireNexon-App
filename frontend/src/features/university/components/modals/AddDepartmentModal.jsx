import { useState } from "react";
import Button from "@/features/university/components/ui/Button";
import Input from "@/features/university/components/ui/Input";

const AddDepartmentModal = ({ open, onClose, onSubmit }) => {
  const [department, setDepartment] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    onSubmit(department);
    setDepartment("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">
        <h2 className="text-lg font-semibold mb-4">
          Add Department
        </h2>

        <Input
          label="Department Name"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddDepartmentModal;

import { useState } from "react";
import Input from "@/features/university/components/ui/Input";
import Select from "@/features/university/components/ui/Select";
import Button from "@/features/university/components/ui/Button";

const DepartmentForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    hod: initialData.hod || "",
    totalStudents: initialData.totalStudents || "",
    status: initialData.status || "active",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold mb-6">
        Department Information
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Grid Layout Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Department Name"
            value={formData.name}
            onChange={(e) =>
              handleChange("name", e.target.value)
            }
            required
          />

          <Input
            label="Head of Department"
            value={formData.hod}
            onChange={(e) =>
              handleChange("hod", e.target.value)
            }
          />

          <Input
            label="Total Students"
            type="number"
            value={formData.totalStudents}
            onChange={(e) =>
              handleChange("totalStudents", e.target.value)
            }
          />

          <Select
            label="Status"
            value={formData.status}
            onChange={(e) =>
              handleChange("status", e.target.value)
            }
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="reset" variant="secondary">
            Reset
          </Button>

          <Button type="submit">
            Save Department
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;
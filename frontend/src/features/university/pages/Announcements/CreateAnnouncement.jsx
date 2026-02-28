import { useState } from "react";
import UniversityLayout from "@/features/university/components/layout/UniversityLayout";
import Input from "@/features/university/components/ui/Input";
import Button from "@/features/university/components/ui/Button";

const CreateAnnouncement = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <UniversityLayout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold mb-6">
          Create Announcement
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              rows={4}
              className="px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              Publish Announcement
            </Button>
          </div>
        </form>
      </div>
    </UniversityLayout>
  );
};

export default CreateAnnouncement;
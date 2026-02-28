import Input from "@/features/university/components/ui/Input";
import Button from "@/features/university/components/ui/Button";

const UniversityBasicInfoForm = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold mb-6">
        Basic Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="University Name" />
        <Input label="Established Year" type="number" />
        <Input label="Accreditation" />
        <Input label="Total Students" type="number" />
      </div>

      <div className="flex justify-end mt-6">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default UniversityBasicInfoForm;
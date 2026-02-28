import Input from "@/features/university/components/ui/Input";
import Button from "@/features/university/components/ui/Button";

const UniversityContactForm = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold mb-6">
        Contact Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Email Address" type="email" />
        <Input label="Phone Number" />
        <Input label="Website URL" />
        <Input label="Location" />
      </div>

      <div className="flex justify-end mt-6">
        <Button>Update Contact</Button>
      </div>
    </div>
  );
};

export default UniversityContactForm;
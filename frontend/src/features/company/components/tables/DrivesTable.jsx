import Input from "../ui/Input";
import Button from "../ui/Button";

const DriveForm = ({ formData, onChange, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4"
    >
      <Input
        label="Drive Title"
        name="title"
        value={formData.title}
        onChange={onChange}
      />

      <Input
        label="Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={onChange}
      />

      <Button type="submit">Create Drive</Button>
    </form>
  );
};

export default DriveForm;

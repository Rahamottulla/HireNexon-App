import Input from "../ui/Input";
import Button from "../ui/Button";

const AnnouncementForm = ({ formData, onChange, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4"
    >
      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={onChange}
      />

      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-600">
          Message
        </label>
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={onChange}
          className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-black/20 focus:outline-none"
        />
      </div>

      <Button type="submit">Publish</Button>
    </form>
  );
};

export default AnnouncementForm;

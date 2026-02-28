import useUpdateNotificationSettings from "@/features/university/hooks/useUpdateNotificationSettings";

const NotificationSettings = ({ data }) => {
  const { form, handleToggle, handleSubmit } =
    useUpdateNotificationSettings(data);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
      <h2 className="text-lg font-semibold">Notification Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <label className="flex items-center justify-between">
          Email Notifications
          <input
            type="checkbox"
            checked={form.emailNotifications}
            onChange={() =>
              handleToggle("emailNotifications")
            }
          />
        </label>

        <label className="flex items-center justify-between">
          SMS Notifications
          <input
            type="checkbox"
            checked={form.smsNotifications}
            onChange={() =>
              handleToggle("smsNotifications")
            }
          />
        </label>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition"
          >
            Update Notifications
          </button>
        </div>

      </form>
    </div>
  );
};

export default NotificationSettings;
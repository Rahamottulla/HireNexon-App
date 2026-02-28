import AccessControlSection from "./AccessControlSection";

const AccessControlSettings = ({ data }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
      <h2 className="text-lg font-semibold">
        Access Control
      </h2>

      <AccessControlSection roles={data.roles} />
    </div>
  );
};

export default AccessControlSettings;
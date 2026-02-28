const AccessControl = ({ roles }) => {
  return (
    <div className="space-y-4">
      {roles.map((role) => (
        <div
          key={role._id}
          className="border border-gray-100 rounded-xl p-4 flex justify-between items-center"
        >
          <span className="font-medium">
            {role.name}
          </span>
          <span className="text-sm text-gray-500">
            {role.permissions.length} permissions
          </span>
        </div>
      ))}
    </div>
  );
};

export default AccessControl;
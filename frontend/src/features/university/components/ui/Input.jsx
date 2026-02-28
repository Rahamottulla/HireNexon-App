const Input = ({ label, className = "", ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-600">
          {label}
        </label>
      )}
      <input
        className={`px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
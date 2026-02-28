const Input = ({ label, className = "", ...props }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-xs text-gray-600 font-medium">
          {label}
        </label>
      )}
      <input
        className={`w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-black/20 focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;

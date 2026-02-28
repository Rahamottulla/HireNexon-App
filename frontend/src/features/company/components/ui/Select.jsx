const Select = ({ label, options = [], className = "", ...props }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-xs font-medium text-gray-600">
          {label}
        </label>
      )}

      <select
        className={`w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 ${className}`}
        {...props}
      >
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

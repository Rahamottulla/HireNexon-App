const Select = ({ label, options = [], ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-600">
          {label}
        </label>
      )}
      <select
        className="px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
        {...props}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
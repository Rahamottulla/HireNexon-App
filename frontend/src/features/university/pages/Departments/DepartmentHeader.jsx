const DepartmentHeader = ({
  title,
  description,
  buttonText,
  onAdd,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>
      </div>

      {buttonText && (
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default DepartmentHeader;
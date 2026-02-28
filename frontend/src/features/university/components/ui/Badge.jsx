const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded-full font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
const StatCard = ({ title, value, subtitle }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <p className="text-xs text-gray-500">{title}</p>
      <h3 className="text-2xl font-semibold mt-1">{value}</h3>
      {subtitle && (
        <p className="text-xs text-gray-400 mt-2">{subtitle}</p>
      )}
    </div>
  );
};

export default StatCard;

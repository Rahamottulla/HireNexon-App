const DriveCard = ({ company, date }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h4 className="font-semibold">{company}</h4>
      <p className="text-sm text-gray-500">
        Drive Date: {date}
      </p>
    </div>
  );
};

export default DriveCard;
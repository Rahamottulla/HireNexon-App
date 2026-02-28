const DriveCard = ({ drive }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-gray-900">
        {drive.title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {drive.company}
      </p>

      <div className="flex justify-between mt-4 text-xs text-gray-400">
        <span>{drive.date}</span>
        <span>{drive.applicants} Applicants</span>
      </div>
    </div>
  );
};

export default DriveCard;

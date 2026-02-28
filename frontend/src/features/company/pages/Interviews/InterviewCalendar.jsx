const InterviewCalendar = ({ interviews = [] }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Interview Schedule
      </h2>

      <div className="space-y-4">
        {interviews.map((interview) => (
          <div
            key={interview.id}
            className="p-4 border border-gray-100 rounded-xl flex justify-between"
          >
            <div>
              <p className="font-medium">{interview.candidate}</p>
              <p className="text-sm text-gray-500">
                {interview.date}
              </p>
            </div>
            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
              {interview.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewCalendar;
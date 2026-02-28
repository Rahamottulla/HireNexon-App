import { formatDistanceToNow } from "date-fns";

const RecentActivities = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold mb-6">
          Recent Activities
        </h2>
        <p className="text-sm text-gray-500">
          No recent activity available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">
          Recent Activities
        </h2>
      </div>

      <ul className="space-y-6">
        {activities.map((activity) => (
          <li
            key={activity._id}
            className="flex items-start gap-4"
          >
            {/* Activity Indicator */}
            <div className="w-3 h-3 mt-2 rounded-full bg-blue-600 flex-shrink-0" />

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm text-gray-800 font-medium">
                {activity.message}
              </p>

              <span className="text-xs text-gray-400 mt-1 block">
                {formatDistanceToNow(new Date(activity.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;
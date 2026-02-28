const ActivityFeed = ({ activities }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-6">
        Recent Activities
      </h2>

      <ul className="space-y-4 text-sm text-gray-600">
        {activities.map((activity) => (
          <li
            key={activity._id}
            className="border-b pb-3 last:border-none"
          >
            {activity.message}
            <span className="block text-xs text-gray-400 mt-1">
              {activity.createdAt}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;

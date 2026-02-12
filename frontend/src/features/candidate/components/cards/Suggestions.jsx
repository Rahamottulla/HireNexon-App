import React from "react";

const Suggestions = () => {
  const users = [
    { name: "Taniya", title: "BCA Student" },
    { name: "Shriya", title: "UI/UX Designer" },
    { name: "Jeet", title: "Backend Developer" },
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-md mb-4 transition hover:shadow-lg">
      <h4 className="font-semibold text-gray-800 mb-3">
        People You May Know
      </h4>

      {users.map((u, i) => (
        <div key={i} className="flex items-center gap-3 mb-3">
          <img
            src="https://via.placeholder.com/40"
            alt={u.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{u.name}</p>
            <p className="text-sm text-gray-500">{u.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;

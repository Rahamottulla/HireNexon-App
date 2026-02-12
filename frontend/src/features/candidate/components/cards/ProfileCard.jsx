import React from "react";

const ProfileCard = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md mb-4 transition hover:shadow-lg">
      <div className="flex items-center gap-3">
        <img
          src="https://via.placeholder.com/48"
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h4 className="font-semibold text-gray-800">
            Rahamottulla Haque Mondal
          </h4>
          <p className="text-sm text-gray-600">Computer Science Student</p>
        </div>
      </div>

      <hr className="my-3" />

      <p className="text-sm text-gray-700">
        Connections: <strong>150+</strong>
      </p>
      <p className="text-sm text-gray-700">
        Profile Views: <strong>89</strong>
      </p>
    </div>
  );
};

export default ProfileCard;

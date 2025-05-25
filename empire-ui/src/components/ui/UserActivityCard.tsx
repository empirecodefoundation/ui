import React from "react";

const UserActivityCard = ({ activities = [], onViewHistory }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Recent Activities
      </h2>
      <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <li key={index} className="py-3">
              <div className="text-sm text-gray-700">
                <strong>Prompt:</strong> {activity.prompt}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Model:</strong> {activity.model}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Action:</strong> {activity.action}
              </div>
              <div className="text-sm text-gray-500">
                <strong>Time:</strong>{" "}
                {new Date(activity.timestamp).toLocaleString()}
              </div>
            </li>
          ))
        ) : (
          <li className="py-3 text-gray-500 text-sm">No recent activities.</li>
        )}
      </ul>
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          onClick={onViewHistory}
          aria-label="View full activity history"
        >
          View History
        </button>
      </div>
    </div>
  );
};

export default UserActivityCard;

import React from 'react';

const Dashboard = () => {
  // Dummy stats – replace with real API data later
  const stats = {
    totalUsers: 24,
    totalStores: 8,
    totalRatings: 57,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-medium text-gray-600">Total Users</h2>
          <p className="text-4xl font-bold text-indigo-600 mt-2">{stats.totalUsers}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-medium text-gray-600">Total Stores</h2>
          <p className="text-4xl font-bold text-purple-600 mt-2">{stats.totalStores}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-medium text-gray-600">Total Ratings</h2>
          <p className="text-4xl font-bold text-pink-600 mt-2">{stats.totalRatings}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

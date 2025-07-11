import React, { useEffect, useState } from 'react';
import API from '../utils/axios';

const OwnerDashboard = () => {
  const [averageRating, setAverageRating] = useState(null);
  const [userRatings, setUserRatings] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await API.get('/owner/dashboard');
      setAverageRating(res.data.averageRating);
      setUserRatings(res.data.userRatings);
    } catch (err) {
      console.error('Error loading owner dashboard:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-purple-700">Store Owner Dashboard</h1>

      <div className="mb-6 bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Average Store Rating</h2>
        <p className="text-5xl font-bold text-yellow-500">
          {averageRating !== null ? averageRating.toFixed(1) : 'N/A'}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">User Ratings</h2>
        <table className="w-full table-auto border">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left p-3 border">Name</th>
              <th className="text-left p-3 border">Rating</th>
            </tr>
          </thead>
          <tbody>
            {userRatings.length > 0 ? (
              userRatings.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-100">
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.rating}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4 text-gray-500">
                  No ratings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerDashboard;

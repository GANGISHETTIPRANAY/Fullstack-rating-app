import React, { useState, useEffect } from 'react';
import API from '../utils/axios';

const UserDashboard = () => {
  const [search, setSearch] = useState('');
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await API.get('/user/stores');
      setStores(res.data); // Assumes each store: { id, name, address, overallRating, userRating }
    } catch (err) {
      console.error('Error fetching stores:', err);
    }
  };

  const handleRatingChange = async (storeId, newRating) => {
    try {
      await API.post(`/user/stores/${storeId}/rate`, { rating: newRating });
      setStores((prev) =>
        prev.map((store) =>
          store.id === storeId ? { ...store, userRating: newRating } : store
        )
      );
    } catch (err) {
      console.error('Error submitting rating:', err);
    }
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-purple-500 to-indigo-500">
      <h1 className="text-3xl font-bold text-white mb-6">Welcome, User</h1>

      <input
        type="text"
        placeholder="Search by name or address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md mb-6 p-3 rounded-lg border border-gray-300 shadow-sm"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStores.map((store) => (
          <div
            key={store.id}
            className="bg-white rounded-xl shadow p-5 flex flex-col gap-2"
          >
            <h2 className="text-xl font-bold text-indigo-700">{store.name}</h2>
            <p className="text-sm text-gray-700">{store.address}</p>
            <p className="text-sm">Overall Rating: {store.overallRating}</p>
            <div>
              <label className="text-sm">Your Rating:</label>
              <select
                value={store.userRating || ''}
                onChange={(e) =>
                  handleRatingChange(store.id, parseInt(e.target.value))
                }
                className="ml-2 p-2 rounded-lg border"
              >
                <option value="">Rate</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;

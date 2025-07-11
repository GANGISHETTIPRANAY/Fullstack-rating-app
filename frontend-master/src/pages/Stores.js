import React, { useState, useEffect } from 'react';
import API from '../utils/axios';

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('');

  const fetchStores = async () => {
    try {
      const params = {};
      if (search) {
        params.name = search;
        params.email = search;
        params.address = search;
      }

      const res = await API.get('/admin/stores', { params });
      setStores(res.data);
    } catch (err) {
      console.error('Error fetching stores:', err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [search]);

  const handleSort = (key) => {
    setSortKey(key);
    const sorted = [...stores].sort((a, b) =>
      a[key].toString().localeCompare(b[key].toString())
    );
    setStores(sorted);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">All Registered Stores</h2>

        <input
          type="text"
          placeholder="Search by name, email, or address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl"
        />

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-indigo-100 text-indigo-700">
                <th className="p-3 cursor-pointer" onClick={() => handleSort('name')}>
                  Store Name ⬍
                </th>
                <th className="p-3 cursor-pointer" onClick={() => handleSort('email')}>
                  Email ⬍
                </th>
                <th className="p-3 cursor-pointer" onClick={() => handleSort('address')}>
                  Address ⬍
                </th>
                <th className="p-3">Avg. Rating</th>
              </tr>
            </thead>
            <tbody>
              {stores.length > 0 ? (
                stores.map((store) => (
                  <tr key={store.id} className="border-t">
                    <td className="p-3">{store.name}</td>
                    <td className="p-3">{store.email}</td>
                    <td className="p-3">{store.address}</td>
                    <td className="p-3 font-semibold text-indigo-600">
                      {store.averageRating}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No stores found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

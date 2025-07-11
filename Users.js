import React, { useState, useEffect } from 'react';
import API from '../utils/axios';

const Users = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const params = {};
      if (search) params.name = search;
      if (roleFilter !== 'All') params.role = roleFilter.toUpperCase();

      const res = await API.get('/admin/users', { params });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter]);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">Users</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, email or address"
          className="px-4 py-2 border rounded-lg w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-lg w-full md:w-1/4"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">Normal</option>
          <option value="STORE_OWNER">Store Owner</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Address</th>
              <th className="px-6 py-3 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.address}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                      user.role === 'ADMIN'
                        ? 'bg-indigo-600'
                        : user.role === 'USER'
                        ? 'bg-green-600'
                        : 'bg-yellow-600'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

import React, { useState } from 'react';

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    role: 'Normal',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (formData.name.length < 20 || formData.name.length > 60) {
      errs.name = 'Name must be between 20 and 60 characters.';
    }
    if (formData.address.length > 400) {
      errs.address = 'Address must not exceed 400 characters.';
    }
    if (
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/.test(formData.password)
    ) {
      errs.password = 'Password must be 8–16 characters, with one uppercase & one special character.';
    }
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errs.email = 'Invalid email address.';
    }
    return errs;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('User added:', formData);
      alert('User added successfully!');
      setFormData({
        name: '',
        email: '',
        address: '',
        password: '',
        role: 'Normal',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Add New User</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white shadow-lg p-6 rounded-lg space-y-4"
      >
        <div>
          <label className="block font-medium">Name</label>
          <input
            name="name"
            type="text"
            className="w-full border rounded px-4 py-2 mt-1"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            name="email"
            type="email"
            className="w-full border rounded px-4 py-2 mt-1"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input
            name="password"
            type="password"
            className="w-full border rounded px-4 py-2 mt-1"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <textarea
            name="address"
            className="w-full border rounded px-4 py-2 mt-1"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="block font-medium">Role</label>
          <select
            name="role"
            className="w-full border rounded px-4 py-2 mt-1"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Normal">Normal</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;

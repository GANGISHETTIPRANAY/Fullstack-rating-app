// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Admin Pages
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import Stores from './pages/Stores';
import UserDetails from './pages/UserDetails';
import UserDashboard from './pages/UserDashboard';
import OwnerDashboard from './pages/OwnerDashboard'

// Auth Pages
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/users/add" element={<AddUser />} />
        <Route path="/admin/stores" element={<Stores />} />
        <Route path="/admin/user/:id" element={<UserDetails />} />
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (name.length < 20 || name.length > 60) {
      alert('Name must be between 20 and 60 characters');
      return;
    }

    if (address.length > 400) {
      alert('Address must be under 400 characters');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must be 8-16 characters, include at least one uppercase letter and one special character.');
      return;
    }

    try {
      await API.post('/auth/register', { name, email, address, password });
      alert('Registration successful!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-700 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Create Your Account</h2>
        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Your address"
              rows="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl hover:bg-purple-700 transition duration-200"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/" className="text-purple-600 font-medium hover:underline">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

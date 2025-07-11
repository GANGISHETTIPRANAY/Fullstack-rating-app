const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {
  getDashboardStats,
  createUser,
  getAllUsers,
  getAllStores,
  getUserDetails
} = require('../controllers/admin.controller');

// ✅ Protect all routes - only ADMIN can access
router.use(authenticate, authorize('ADMIN'));

// ✅ Admin Dashboard: stats
router.get('/dashboard', getDashboardStats);

// ✅ Add user (normal or admin)
router.post('/add-user', createUser);

// ✅ List users with filters
router.get('/users', getAllUsers);

// ✅ List all stores with filters
router.get('/stores', getAllStores);

// ✅ Get individual user details
router.get('/user/:id', getUserDetails);

module.exports = router;

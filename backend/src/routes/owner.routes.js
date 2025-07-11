const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { getOwnerDashboard } = require('../controllers/owner.controller');

router.get('/dashboard', authenticate, authorize('STORE_OWNER'), getOwnerDashboard);

module.exports = router;

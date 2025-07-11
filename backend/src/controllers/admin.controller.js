const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const getDashboardStats = async (req, res) => {
  try {
    const users = await prisma.user.count();
    const stores = await prisma.store.count();
    const ratings = await prisma.rating.count();

    res.json({ users, stores, ratings });
  } catch (err) {
    res.status(500).json({ message: 'Error loading stats' });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashed, address, role }
    });

    res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

const getAllUsers = async (req, res) => {
  const { name, email, role, address } = req.query;

  try {
    const users = await prisma.user.findMany({
      where: {
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
        email: email ? { contains: email, mode: 'insensitive' } : undefined,
        role: role || undefined,
        address: address ? { contains: address, mode: 'insensitive' } : undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
      },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

const getAllStores = async (req, res) => {
  const { name, email, address } = req.query;

  try {
    const stores = await prisma.store.findMany({
      where: {
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
        email: email ? { contains: email, mode: 'insensitive' } : undefined,
        address: address ? { contains: address, mode: 'insensitive' } : undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        ratings: {
          select: { rating: true }
        }
      }
    });

    const formatted = stores.map(store => {
      const total = store.ratings.length;
      const avg = total ? (store.ratings.reduce((a, b) => a + b.rating, 0) / total).toFixed(1) : 'N/A';

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        averageRating: avg
      };
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stores' });
  }
};

const getUserDetails = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        store: {
          include: {
            ratings: true
          }
        }
      }
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const response = {
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
    };

    if (user.role === 'STORE_OWNER') {
      const ratings = user.store?.ratings || [];
      const avgRating = ratings.length
        ? (ratings.reduce((a, b) => a + b.rating, 0) / ratings.length).toFixed(1)
        : 'N/A';
      response.storeRating = avgRating;
    }

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: 'Error loading user details' });
  }
};

module.exports = {
  getDashboardStats,
  createUser,
  getAllUsers,
  getAllStores,
  getUserDetails
};

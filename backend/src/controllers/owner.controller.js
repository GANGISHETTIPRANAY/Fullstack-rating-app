const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getOwnerDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;
    const store = await prisma.store.findUnique({
      where: { ownerId: userId },
      include: { ratings: { include: { user: true } } },
    });

    if (!store) return res.status(404).json({ message: 'Store not found' });

    const total = store.ratings.length;
    const averageRating = total
      ? store.ratings.reduce((acc, r) => acc + r.rating, 0) / total
      : null;

    const userRatings = store.ratings.map((r) => ({
      id: r.userId,
      name: r.user.name,
      rating: r.rating,
    }));

    res.json({ averageRating, userRatings });
  } catch (err) {
    res.status(500).json({ message: 'Error loading dashboard', error: err.message });
  }
};

module.exports = { getOwnerDashboard };

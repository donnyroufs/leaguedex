const express = require('express');

const userRoutes = require('./user.routes');
const championRoutes = require('./champion.routes');
const matchupRoutes = require('./matchup.routes');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/champion', championRoutes);
router.use('/matchup', matchupRoutes);
router.use('/', (req, res) => {
  res.json({
    public_endpoints: {
      '/champion': 'get all league of legends champions',
      '/champion/:name': 'Get a champion by name',
    },
  });
});

module.exports = router;

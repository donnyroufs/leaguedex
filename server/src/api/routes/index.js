const express = require('express');

const userRoutes = require('./user.routes');
const championRoutes = require('./champion.routes');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/champion', championRoutes);

module.exports = router;

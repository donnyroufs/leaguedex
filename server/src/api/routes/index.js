const express = require('express');

const userRoutes = require('./user.routes');
const championRoutes = require('./champion.routes');
const matchupRoutes = require('./matchup.routes');
const noteRoutes = require('./note.routes');
const sharedRoutes = require('./shared.routes');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/champion', championRoutes);
router.use('/matchup', matchupRoutes);
router.use('/note', noteRoutes);
router.use('/shared', sharedRoutes);

module.exports = router;

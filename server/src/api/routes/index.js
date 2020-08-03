const express = require("express");
const noteRoutes = require("./note.routes");
const championRoutes = require('./champion.routes');

const router = express.Router();

router.use("/note", noteRoutes);
router.use("/champion", championRoutes);

module.exports = router;

const express = require("express");

const Auth = require("../../lib/Auth");
const noteRoutes = require("./note.routes");
const userRoutes = require("./user.routes");
const championRoutes = require("./champion.routes");

const router = express.Router();

router.use("/note", Auth.authenticateToken, noteRoutes);
router.use("/user", userRoutes);
router.use("/champion", championRoutes);

module.exports = router;

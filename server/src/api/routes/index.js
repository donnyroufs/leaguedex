const express = require("express");

const Auth = require("../../lib/Auth");
const noteRoutes = require("./note.routes");
const userRoutes = require("./user.routes");

const router = express.Router();

router.use("/note", Auth.authenticateToken, noteRoutes);
router.use("/user", userRoutes);

module.exports = router;

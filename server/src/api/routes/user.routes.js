const express = require("express");
const Controller = require("../controllers/User.controller");
const Auth = require("../../lib/Auth");
const { db } = require("../../config/database");

const router = express.Router();
const controller = new Controller({ model: db.user, auth: Auth });

router.post("/register", controller.create);
router.post("/login", controller.login);
router.delete("/logout", controller.destroy);

router.get("/token", controller.refresh);

module.exports = router;

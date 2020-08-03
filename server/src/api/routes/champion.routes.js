const express = require("express");
const Controller = require("../controllers/Controller");
const { db } = require("../../config/database");

const router = express.Router();
const controller = new Controller(db.champion);

router.get("/", controller.all);

module.exports = router;

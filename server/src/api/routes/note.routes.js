const express = require("express");
const Controller = require("../controllers/Controller");
const { db } = require("../../config/database");

const router = express.Router();
const controller = new Controller(db.note);

router.get("/", controller.all);
router.get("/:id", controller.findOneById);
router.post("/", controller.createOne);
router.put("/:id", controller.updateOne);
router.delete("/:id", controller.deleteOne);

module.exports = router;

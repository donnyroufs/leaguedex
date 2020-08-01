const express = require("express");
const Controller = require("../controllers/Controller");
const Note = require("../models/note.model");

const router = express.Router();
const controller = new Controller(Note);

router.get("/", controller.all);
router.get("/:id", controller.findOneById);
router.post("/", controller.createOne);
router.put("/:id", controller.updateOne);
router.delete("/:id", controller.deleteOne);

module.exports = router;

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

// router.get("/", async (_, res) => {
//   const notes = await Note.find();
//   res.status(200).json(notes);
// });

// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const note = await Note.findById(id);
//     if (!note) {
//       throw new ErrorHandler(404, `No note found with the id: ${id}.`);
//     }
//     res.status(200).json(note);
//   } catch (err) {
//     next(err);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const newNote = new Note(req.body);
//     await newNote.save();
//     res.status(200).json(newNote);
//   } catch (err) {
//     next(err);
//   }
// });

// router.put("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const note = await Note.findByIdAndUpdate(id, req.body);
//     res.status(200).json(note);
//   } catch (err) {
//     next(err);
//   }
// });

// delete

module.exports = router;

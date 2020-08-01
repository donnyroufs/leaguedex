require("dotenv/config");

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const { handleError, ErrorHandler } = require("./helpers/error");

const noteSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Note = mongoose.model("Note", noteSchema);

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("connected to database..."));

app.use(express.json());
app.use(morgan("tiny"));

app.get("/note", async (_, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
});

app.get("/note/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      throw new ErrorHandler(404, `No note found with the id: ${id}.`);
    }
    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
});

app.post("/note", async (req, res, next) => {
  try {
    const newNote = new Note(req.body);
    await newNote.save();
    res.status(200).json(newNote);
  } catch (err) {
    next(err);
  }
});

app.put("/note/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndUpdate(id, req.body);
    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
});

app.get("/error", (req, res) => {
  throw new ErrorHandler("500", "internal server error.");
});

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(process.env.PORT, () =>
  console.log(`Server listening on ${process.env.PORT}`)
);

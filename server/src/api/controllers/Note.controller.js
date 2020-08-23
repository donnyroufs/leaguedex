const Controller = require('./Controller');
const { ErrorHandler } = require('../../helpers/error');
const { db } = require('../../config/database');

class NotesController extends Controller {
  constructor({ model }) {
    super(model);

    this.createOne = this.createOne.bind(this);
    this.findByMatchupId - this.findByMatchupId.bind(this);
  }

  async deleteOne(req, res, next) {
    const { id } = req.user;
    const { noteId } = req.params;

    try {
      const result = await db.note.deleteMany({
        where: {
          id: Number(noteId),
          user_id: Number(id),
        },
      });

      res.status(202).json(result);
    } catch (err) {
      next(err);
    }
  }

  async createOne(req, res, next) {
    try {
      const { content, tags, matchupId } = req.body;
      const created = await db.note.create({
        data: {
          content,
          tags,
          user: {
            connect: {
              id: Number(req.user.id),
            },
          },
          matchup: {
            connect: {
              id: Number(matchupId),
            },
          },
        },
      });

      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }

  async findByMatchupId(req, res, next) {
    const { id } = req.params;
    try {
      const notes = await db.note.findMany({
        where: {
          user_id: Number(req.user.id),
          matchup_id: Number(id),
        },
        select: {
          id: true,
          tags: true,
          content: true,
          createdAt: true,
        },
      });

      // Create formatter
      res.status(200).json(notes);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = NotesController;

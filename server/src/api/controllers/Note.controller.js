const Controller = require('./Controller');
const { ErrorHandler } = require('../../helpers/error');
const { db } = require('../../config/database');

class NotesController extends Controller {
  constructor({ model }) {
    super(model);

    this.createOne = this.createOne.bind(this);
    this.findByMatchupId - this.findByMatchupId.bind(this);
  }

  async createOne(req, res, next) {
    try {
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }

  async findByMatchupId(req, res, next) {
    const { id } = req.params;
    try {
      const notes = await db.note.findMany({
        where: {
          user_id: req.user.id,
          matchup_id: Number(id),
        },
        select: {
          id: true,
          tags: true,
          content: true,
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

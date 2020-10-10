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
      const { content, tags, matchupId, championId } = req.body;
      const created = await db.note.create({
        data: {
          content,
          tags,
          champion_id: Number(championId),
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
    const { championId: champion_id } = req.query;

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

      const globalNotes = await db.$queryRaw(`
          SELECT 
            "Note"."id",
            "Note"."tags",
            "Note"."content",
            "Note"."createdAt"
          FROM 
            "Note"
          WHERE 
            "Note"."user_id" = ${req.user.id}
          AND
            "Note"."champion_id" = ${Number(champion_id)}
          AND 
            "Note"."tags" ~ 'global'
        `);

      const mergedArray = [...notes, ...globalNotes];
      const uniqueNotes = [
        ...new Map(mergedArray.map((item) => [item.id, item])).values(),
      ];

      res.status(200).json(uniqueNotes);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = NotesController;

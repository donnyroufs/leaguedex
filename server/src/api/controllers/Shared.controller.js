const Controller = require('./Controller');
const { ErrorHandler } = require('../../helpers/error');
const { db } = require('../../config/database');

class SharedController extends Controller {
  constructor(props) {
    super(props);
    this.findByMatchupId = this.findByMatchupId.bind(this);
    this.findByUsernameAndId = this.findByUsernameAndId.bind(this);
    this.findManyByUsername = this.findManyByUsername.bind(this);
  }

  async findByUsernameAndId(req, res, next) {
    try {
      const { username } = req.params;
      const data = await db.user.findOne({
        where: {
          username,
        },
        select: {
          username: false,
          matchups: {
            where: {
              id: Number(req.query.id),
              private: false,
            },
            select: {
              championA: true,
              championB: true,
              champion_id: true,
              games_lost: true,
              games_played: true,
              games_won: true,
              id: true,
              opponent_id: true,
              private: true,
              lane: true,
              user_id: true,
            },
          },
        },
      });

      if (!data) {
        res.sendStatus(403);
      }

      res.status(200).json(data.matchups[0]);
    } catch (err) {
      next(err);
    }
  }

  async findManyByUsername(req, res, next) {
    try {
      const { username } = req.query;
      const data = await db.user.findOne({
        where: {
          username,
        },
        select: {
          username: false,
          matchups: {
            where: {
              private: false,
            },
            select: {
              championA: true,
              championB: true,
              champion_id: true,
              games_lost: true,
              games_played: true,
              games_won: true,
              id: true,
              opponent_id: true,
              private: true,
              lane: true,
            },
          },
        },
      });

      if (!data) {
        res.status(404).json([]);
      }

      res.status(200).json(data.matchups);
    } catch (err) {
      next(err);
    }
  }

  async findByMatchupId(req, res, next) {
    const { id } = req.query;
    const { userId } = req.params;
    try {
      const notes = await db.note.findMany({
        where: {
          user_id: Number(userId),
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

module.exports = SharedController;

const Model = require('./Model');
const { db } = require('../../config/database');

class NoteModel extends Model {
  constructor(props) {
    super(props);
  }

  async createOne(userId, { championId, content, tags, matchupId }) {
    const newResource = await this.db.create({
      data: {
        content,
        tags,
        champion_id: Number(championId),
        user: {
          connect: {
            id: Number(userId),
          },
        },
        matchup: {
          connect: {
            id: Number(matchupId),
          },
        },
      },
    });

    return newResource;
  }

  async deleteOne(userId, noteId) {
    await this.db.deleteMany({
      where: {
        id: Number(noteId),
        user_id: Number(userId),
      },
    });

    return true;
  }

  async getScopedNotes(matchId, userId) {
    const resources = await this.db.findMany({
      where: {
        user_id: Number(userId),
        matchup_id: Number(matchId),
      },
      select: {
        id: true,
        tags: true,
        content: true,
        createdAt: true,
      },
    });

    return resources;
  }

  async getGlobalNotes(userId, championId) {
    const resources = await db.$queryRaw(`
          SELECT 
            "Note"."id",
            "Note"."tags",
            "Note"."content",
            "Note"."createdAt"
          FROM 
            "Note"
          WHERE 
            "Note"."user_id" = ${userId}
          AND
            "Note"."champion_id" = ${Number(championId)}
          AND 
            "Note"."tags" ~ 'global'
        `);

    return resources;
  }
}

module.exports = new NoteModel(db.note);

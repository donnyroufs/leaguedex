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
}

module.exports = new NoteModel(db.note);

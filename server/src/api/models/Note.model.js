const Model = require('./Model');
const { db } = require('../../config/database');

class NoteModel extends Model {
  constructor(props) {
    super(props);
  }

  async createOne(userId, { championId, content, tags, matchupId }) {
    console.log({ content });
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
}

module.exports = new NoteModel(db.note);

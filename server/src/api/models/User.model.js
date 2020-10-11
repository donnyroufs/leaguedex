const Model = require('./Model');
const { db } = require('../../config/database');

class UserModel extends Model {
  constructor(props) {
    super(props);
  }

  async create({ username, hashedPassword, email }) {
    await this.db.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });
  }

  async findUser(username) {
    const resource = await this.db.findOne({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        password: true,
        summoner: true,
        permissions: true,
      },
    });

    return resource;
  }
}

module.exports = new UserModel(db.user);

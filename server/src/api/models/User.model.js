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
}

module.exports = new UserModel(db.user);

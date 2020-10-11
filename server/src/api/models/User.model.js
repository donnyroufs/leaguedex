const Model = require('./Model');
const { db } = require('../../config/database');

class UserModel extends Model {
  constructor(props) {
    super(props);
  }

  async getDashboardData() {
    const resource = await this.db.findMany({
      select: {
        username: true,
        summoner: {
          select: {
            name: true,
            level: true,
            region: true,
          },
        },
        email: true,
        createdAt: true,
        matchups: {
          select: {
            id: true,
          },
        },
      },
    });

    return resource;
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

  async createSummoner(userId, { id, name, summonerLevel, region }) {
    const newResource = await db.summoner.create({
      data: {
        accountId: id,
        name: name,
        level: summonerLevel,
        region: region,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return newResource;
  }

  async updateAccountPermissions(userId, permissions = 2) {
    const updatedResource = await this.db.update({
      where: {
        id: userId,
      },
      data: {
        permissions,
      },
    });

    return updatedResource;
  }
}

module.exports = new UserModel(db.user);

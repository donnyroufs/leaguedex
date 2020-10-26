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
    const resource = await this.db.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });

    return resource.id;
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

  async createEmailToken(userId, token) {
    await db.user_verification.create({
      data: {
        token,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async getUserByToken(token) {
    const resource = await db.user_verification.findOne({
      where: {
        token,
      },
    });

    return resource;
  }

  async removeVerificationToken(token) {
    await db.user_verification.delete({
      where: {
        token,
      },
    });
  }
}

module.exports = new UserModel(db.user);

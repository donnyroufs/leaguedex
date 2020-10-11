class Model {
  constructor(db) {
    this.db = db;

    this.all = this.all.bind(this);
    this.findOneById = this.findOneById.bind(this);
    this.findOneByName = this.findOneByName.bind(this);
    this.createOne = this.createOne.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
  }

  async all() {
    const resources = await this.db.findMany();
    return resources;
  }

  async findOneById(id) {
    const resource = await this.db.findOne({
      where: {
        id,
      },
    });

    return resource;
  }

  async findOneByName(name) {
    const resource = await this.db.findOne({
      where: {
        name,
      },
    });

    return resource;
  }

  async createOne(payload) {
    const newResource = await this.db.create({
      data: {
        ...payload,
      },
    });

    return newResource;
  }

  async updateOne(id, payload) {
    const resource = await this.db.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });

    return resource;
  }

  async deleteOne(id) {
    const result = await this.db.delete({
      where: { id },
    });

    return result;
  }
}

module.exports = Model;

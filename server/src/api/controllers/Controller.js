const { ErrorHandler, NotFoundError } = require('../../helpers/error');

class Controller {
  constructor(model, formatters) {
    this.model = model;
    this.formatters = formatters;

    this.all = this.all.bind(this);
    this.findOneById = this.findOneById.bind(this);
    this.findOneByName = this.findOneByName.bind(this);
    this.createOne = this.createOne.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
  }

  async all(_, res) {
    const data = await this.model.all();

    if (!data) {
      throw new NotFoundError();
    }

    res.status(200).json(data);
  }

  async findOneById(req, res) {
    const { id } = req.params;
    const resource = await this.model.findOneById(Number(id));

    if (!resource) {
      throw new NotFoundError();
    }

    res.status(200).json(resource);
  }

  async findOneByName(req, res, next) {
    const { name } = req.params;

    const resource = await this.model.findOneByName(name);

    if (!resource) {
      throw new NotFoundError();
    }

    res.status(200).json(resource);
  }

  async createOne(req, res) {
    const newResource = await this.model.createOne(req.body);

    res.status(201).json(newResource);
  }

  async updateOne(req, res) {
    const { id } = req.params;
    const resource = await this.model.updateOne(id, req.body);

    res.status(204).json(resource);
  }

  async deleteOne(req, res, next) {
    const { id } = req.params;
    await this.model.deleteOne(id);

    res.status(204).json({});
  }
}

module.exports = Controller;

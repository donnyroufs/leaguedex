const { ErrorHandler } = require('../../helpers/error');

class Controller {
  constructor(model, db, formatters) {
    this.db = db;
    this.model = model;
    this.formatters = formatters;

    this.all = this.all.bind(this);
    this.findOneById = this.findOneById.bind(this);
    this.findOneByName = this.findOneByName.bind(this);
    this.createOne = this.createOne.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
  }

  async all(req, res) {
    const data = await this.db.findMany();
    res.status(200).json(data);
  }

  async findOneById(req, res, next) {
    try {
      const { id } = req.params;
      const item = await this.db.findOne({
        where: {
          id: Number(id),
        },
      });
      if (!item) {
        throw new ErrorHandler(404, `No entries found with the id: ${id}`);
      }
      res.status(200).json(item);
    } catch (err) {
      next(err);
    }
  }

  async findOneByName(req, res, next) {
    try {
      const { name } = req.params;
      const item = await this.db.findOne({
        where: {
          name: String(name),
        },
      });
      if (!item) {
        throw new ErrorHandler(404, `No entries found with the name: ${name}`);
      }
      res.status(200).json(item);
    } catch (err) {
      next(err);
    }
  }

  async createOne(req, res, next) {
    try {
      const newItem = await this.db.create({
        data: {
          ...req.body,
        },
      });
      res.status(201).json(newItem);
    } catch (err) {
      next(err);
    }
  }

  async updateOne(req, res, next) {
    try {
      const { id } = req.params;
      const item = await this.db.update({
        where: {
          id: Number(id),
        },
        data: {
          ...req.body,
        },
      });
      res.status(204).json(item);
    } catch (err) {
      next(err);
    }
  }

  async deleteOne(req, res, next) {
    const { id } = req.params;
    try {
      await this.db.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;

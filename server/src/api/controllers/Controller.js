const { ErrorHandler } = require("../../helpers/error");

class Controller {
  constructor(model) {
    this.model = model;

    this.all = this.all.bind(this);
    this.findOneById = this.findOneById.bind(this);
    this.createOne = this.createOne.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
  }

  async all(req, res) {
    const data = await this.model.find();
    res.status(200).json(data);
  }

  async findOneById(req, res, next) {
    try {
      const { id } = req.params;
      const item = await this.model.findById(id);
      if (!item) {
        throw new ErrorHandler(404, `No entries found with the id: ${id}`);
      }
      res.status(200).json(item);
    } catch (err) {
      next(err);
    }
  }

  async createOne(req, res, next) {
    try {
      const newItem = new this.model(req.body);
      await newItem.save();
      res.status(201).json(newItem);
    } catch (err) {
      next(err);
    }
  }

  async updateOne(req, res, next) {
    try {
      const { id } = req.params;
      const item = await this.model.findByIdAndUpdate(id, req.body);
      res.status(204).json(item);
    } catch (err) {
      next(err);
    }
  }

  async deleteOne(req, res, next) {
    const { id } = req.params;
    try {
      await this.model.findByIdAndRemove(id);
      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;

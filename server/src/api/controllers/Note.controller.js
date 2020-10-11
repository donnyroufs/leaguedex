const Controller = require('./Controller');
const { ErrorHandler } = require('../../helpers/error');
const { db } = require('../../config/database');

class NotesController extends Controller {
  constructor(...props) {
    super(...props);

    this.findByMatchId = this.findByMatchId.bind(this);
    this.createOne = this.createOne.bind(this);
  }

  async createOne(req, res) {
    const { id } = req.user;

    const created = await this.model.createOne(id, req.body);

    res.status(201).json(created);
  }

  async deleteOne(req, res) {
    const { id } = req.user;
    const { noteId } = req.params;

    const result = await this.model.deleteOne(id, noteId);

    res.status(202).json(result);
  }

  async findByMatchId(req, res) {
    const { id } = req.params;
    const { id: userId } = req.user;
    const { championId } = req.query;

    const notes = await this.model.getScopedNotes(id, userId);
    const globalNotes = await this.model.getGlobalNotes(userId, championId);

    const uniqueNotes = this.formatters.mergeNotes(notes, globalNotes);

    res.status(200).json(uniqueNotes);
  }
}

module.exports = NotesController;

const Model = require('./Model');
const { db } = require('../../config/database');

class NoteModel extends Model {}

module.exports = new NoteModel(db.note);

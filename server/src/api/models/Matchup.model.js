const { db } = require('../../config/database');
const Model = require('./Model');

class MatchupModel extends Model {
  constructor(...props) {
    super(...props);
  }
}

module.exports = new MatchupModel(db.matchup);

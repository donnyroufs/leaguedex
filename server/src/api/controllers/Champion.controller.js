const Controller = require('./Controller');

class ChampionController extends Controller {
  constructor(props) {
    super(props);
    this.all = this.all.bind(this);
  }

  async all(_, res) {
    const champions = await this.db.getAllChampions();

    if (!champions) {
      return ErrorHandler(404, 'could not find any champions in the database.');
    }

    res.status(200).json(champions);
  }
}

module.exports = ChampionController;

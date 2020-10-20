const Controller = require('./Controller');

class ChampionController extends Controller {
  constructor(props) {
    super(props);
  }

  async all(_, res) {
    const champions = await this.model.getAllChampions();

    if (!champions) {
      return ErrorHandler(404, 'could not find any champions in the database.');
    }

    res.status(200).json(champions);
  }
}

module.exports = ChampionController;

const Controller = require('./Controller');

class ChampionController extends Controller {
  constructor(props) {
    super(props);

    this.all = this.all.bind(this);
    this.allWithoutMe = this.allWithoutMe.bind(this);
  }

  async all(_, res) {
    const champions = await this.model.getAllChampions();

    if (!champions) {
      return ErrorHandler(404, 'could not find any champions in the database.');
    }

    res.status(200).json(champions);
  }

  async allWithoutMe(req, res) {
    const { championId } = req.query;

    const champions = await this.model.all();

    const formattedData = champions.filter((c) => c.id !== +championId);
    res.status(200).json(formattedData);
  }
}

module.exports = ChampionController;

const Controller = require('./Controller');
const { NotFoundError } = require('../../helpers/error');

class SharedController extends Controller {
  constructor(...props) {
    super(...props);

    this.findByMatchupId = this.findByMatchupId.bind(this);
    this.findByUsernameAndId = this.findByUsernameAndId.bind(this);
    this.findManyByUsername = this.findManyByUsername.bind(this);
    this.getMatchupsByUsername = this.getMatchupsByUsername.bind(this);
  }

  async findByUsernameAndId(req, res) {
    const { username } = req.params;
    const { id } = req.query;

    // if we have a user

    const [data, likes] = await this.model.findOne(id, username);

    if (!data) {
      throw new NotFoundError();
    }

    const likedByMe = req.user
      ? likes.some((l) => l.user_id === req.user.id)
      : false;

    res
      .status(200)
      .json({ ...data.matchups[0], likes: likes.length, likedByMe });
  }

  async findManyByUsername(req, res) {
    const { username, championName } = req.query;

    const data = await this.model.findManyByUsername(username, championName);

    if (!data) {
      throw new NotFoundError();
    }

    const formattedData = this.formatters.getPlayedMatchups(data.matchups);

    res.status(200).json(formattedData);
  }

  async findByMatchupId(req, res) {
    const { id } = req.query;
    const { userId } = req.params;

    const notes = await this.model.findByMatchupId(id, userId);

    res.status(200).json(notes);
  }

  async getMatchupsByUsername(req, res) {
    const { username } = req.query;

    const matchups = await this.model.getPublicMatchupsByUsername(username);

    res.status(200).json(matchups);
  }
}

module.exports = SharedController;

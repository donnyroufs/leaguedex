const Controller = require('./Controller');

class GameController extends Controller {
  constructor(...props) {
    super(...props);

    this.getRecentGameDate = this.getRecentGameDate.bind(this);
  }

  async getRecentGameDate(req, res) {
    const { summonerId } = req.query;
    const { id } = req.user;

    const data = await this.model.getRecentGameDate(id);

    if (data && data.length > 0) {
      res.status(200).json(data);
    } else {
      const { createdAt } = await this.model.getSummonerCreatedAtDate(
        +summonerId
      );

      res.status(200).json({
        createdAt,
      });
    }
  }
}

module.exports = GameController;

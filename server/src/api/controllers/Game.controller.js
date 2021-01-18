const Controller = require('./Controller');
const { NotFoundError } = require('../../helpers/error');
const Riot = require('../../lib/Riot');

class GameController extends Controller {
  static RELEASED_MATCHHISTORY_FEATURE_IN_TIME = new Date(1610895229910);

  constructor(...props) {
    super(...props);

    this.getMatchHistory = this.getMatchHistory.bind(this);
  }

  async getMatchHistory(req, res) {
    const { accountId, id: summonerId } = req.query;
    const { id } = req.user;

    const data = await this.model.getRecentGameDate(id);

    const summonerData = await this.model.getSummonerInfo(
      +summonerId,
      +accountId
    );

    if (data.length > 0 || summonerData) {
      const timeInMs = this._getCreatedAtInMs(summonerData, data);

      const matchHistoryData = await Riot.getMatchHistory(
        timeInMs,
        summonerData.region,
        summonerData.summonerId
      );

      const serializedData = Riot.serializeMatchHistory(matchHistoryData);

      const matchHistory = await this.model.saveAndGetNotifications(
        serializedData,
        id,
        String(accountId)
      );

      const matches = matchHistory.map((m) =>
        Riot.getGameResultAndMatchupInfo(
          m.game_id,
          summonerData.summonerId,
          summonerData.region,
          m.lane
        )
      );

      const gamesData = await Promise.all(matches);

      const removedNullValues = gamesData.filter((x) => x);
      const formattedData = this.formatters.initialNotifications(
        removedNullValues
      );

      res.status(200).json(formattedData);
    }
  }

  _getCreatedAtInMs(summonerData, data) {
    if (data.length > 0) {
      return data[0].timestamp.getTime();
    } else if (
      summonerData.createdAt.getTime() >=
      GameController.RELEASED_MATCHHISTORY_FEATURE_IN_TIME
    ) {
      return summonerData.createdAt.getTime();
    } else {
      return GameController.RELEASED_MATCHHISTORY_FEATURE_IN_TIME;
    }
  }
}

module.exports = GameController;

const Controller = require('./Controller');
const { NotFoundError } = require('../../helpers/error');
const Riot = require('../../lib/Riot');

class GameController extends Controller {
  static RELEASED_MATCHHISTORY_FEATURE_IN_TIME = 1610537869020;

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
      const timeInMs = this._getCreatedAt(summonerData, data);

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

      console.log('length of games: ', gamesData.length);

      const removedNullValues = gamesData.filter((x) => x);
      console.log(
        'length of games after null values format: ',
        removedNullValues.length
      );
      const formattedData = this.formatters.initialNotifications(
        removedNullValues
      );

      res.status(200).json(formattedData);
    }
  }

  _getCreatedAt(summonerData, data) {
    if (data.length > 0) {
      console.log('data.length timestamp');
      return Number(data[0].timestamp);
    } else if (
      summonerData.createdAt.getTime() >=
      GameController.RELEASED_MATCHHISTORY_FEATURE_IN_TIME
    ) {
      console.log('elseif');
      return summonerData.createdAt.getTime();
    } else {
      console.log('else');
      // released_matchistory_feature_in_time
      return 1610451097698;
      //     1610452265383
    }
  }
}

module.exports = GameController;

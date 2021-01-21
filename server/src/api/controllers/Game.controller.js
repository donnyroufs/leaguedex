const Controller = require('./Controller');
const { NotFoundError, BadRequest } = require('../../helpers/error');
const Riot = require('../../lib/Riot');

class GameController extends Controller {
  static RELEASED_MATCHHISTORY_FEATURE_IN_TIME = 1610895229910;

  constructor(...props) {
    super(...props);

    this.getMatchHistory = this.getMatchHistory.bind(this);
    this.updateNotificationsAndCreateMatchups = this.updateNotificationsAndCreateMatchups.bind(
      this
    );
  }

  async getMatchHistory(req, res) {
    const { accountId, id: summonerId } = req.query;
    const { id } = req.user;

    const data = await this.model.getRecentGameDate(id, summonerId);

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

      const serializedData = await Riot.serializeMatchHistory(
        matchHistoryData,
        String(accountId)
      );

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

  async updateNotificationsAndCreateMatchups(req, res) {
    const { id } = req.user;
    const { gameData, summonerId } = req.body;

    if (!gameData || !summonerId) {
      throw new BadRequest('Missing gameData or active summoner id');
    }

    // TODO: Refactor with a db transaction
    await this.model.updateNotifications(gameData, id, summonerId);

    // Should probably also check whether it already exists so that you can't update a given matchup with the same game
    const matchupsToCreateOrUpdate = gameData
      .filter((game) => game.state === 'accepted')
      .map((game) => this.model.createOrUpdateMatchup(id, game));

    const data = await Promise.all(matchupsToCreateOrUpdate);

    // TODO: Create formatter
    const formattedData = data.map(
      (updatedMatchup) => updatedMatchup.champion_id
    );

    res.status(201).json(formattedData);
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

const Riot = require('../../lib/Riot');
const { db } = require('../../config/database');
const { ErrorHandler, NotFoundError } = require('../../helpers/error');

exports.sync = async (userId, accountId, region) => {
  let updated = false;

  const [data] = await db.matchup.findMany({
    take: 1,
    where: {
      user_id: Number(userId),
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  if (!data) {
    return {
      data: null,
      inSync: true,
      updated: true,
    };
  }

  const total = data.games_won + data.games_lost;
  const outOfSync = data.games_played > total;

  // 1 game buffer
  if (outOfSync) {
    const gameData = await Riot.getGameResults(data.game_id, region);
    if (gameData) {
      const { teamId: wonTeam } = gameData.data.teams.find(
        (team) => team.win === 'Win'
      );

      const { participantId } = gameData.data.participantIdentities.find(
        ({ player }) => player.summonerId === accountId
      );

      const { teamId } = gameData.data.participants.find(
        (player) => player.participantId === participantId
      );

      const didWin = teamId === wonTeam;

      if (didWin) {
        await db.matchup.update({
          where: {
            id: data.id,
          },
          data: {
            games_won: data.games_won + 1,
          },
        });
      } else {
        await db.matchup.update({
          where: {
            id: data.id,
          },
          data: {
            games_lost: data.games_lost + 1,
          },
        });
      }
      updated = true;
    }
  }

  return { data, updated, inSync: !outOfSync };
};

exports.syncMatchup = async (req, _, next) => {
  try {
    const { id } = req.user;
    const { data, updated, inSync } = await this.sync(
      id,
      req.user.summoner.accountId,
      req.user.summoner.region
    );
    req.match = data;
    req.match.updated = updated;
    req.match.inSync = !inSync ? updated : inSync;
    next();
  } catch (err) {
    next(err);
  }
};

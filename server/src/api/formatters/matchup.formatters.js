module.exports = {
  getInfoCard: (props) => ({
    count: props.count,
    gamesPlayed: props.data.reduce((acc, curr) => acc + curr.games_played, 0),
  }),
  getPlayedMatchups: (matchups) =>
    matchups.map((props) => ({
      ...props,
      win_ratio: ((props.games_won / props.games_played) * 100).toFixed() + '%',
      opponent: props.championB.name,
      private: props.private ? 'private' : 'public',
    })),
  findGame: (data, _data, me, opponents) => ({
    gameId: data.gameId,
    me: me,
    opponents,
    startTime: data.gameStartTime,
    confirmed: _data ? Number(_data.game_id) === data.gameId : false,
  }),
};

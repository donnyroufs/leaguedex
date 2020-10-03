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
};

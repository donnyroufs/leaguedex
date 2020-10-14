module.exports = {
  getPlayedMatchups: (matchups) =>
    matchups.map((props) => ({
      ...props,
      win_ratio: ((props.games_won / props.games_played) * 100).toFixed() + '%',
      champion: props.championA.name,
      versus: props.championB.name,
    })),
};

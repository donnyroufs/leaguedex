const isFreshMatchup = (a) => a === 0;

module.exports = {
  getPlayedMatchups: (matchups) =>
    matchups.map((props) => ({
      ...props,
      win_ratio: isFreshMatchup(props.games_won)
        ? '0%'
        : ((props.games_won / props.games_played) * 100).toFixed() + '%',
      champion: props.championA.name,
      versus: props.championB.name,
    })),
};

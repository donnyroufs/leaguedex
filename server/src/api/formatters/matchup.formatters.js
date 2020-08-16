module.exports = {
  getInfoCard: (props) => ({
    count: props.count,
    gamesPlayed: props.data.reduce((acc, curr) => acc + curr.games_played, 0),
  }),
};

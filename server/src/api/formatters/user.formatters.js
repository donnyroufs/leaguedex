module.exports = {
  all: (data) =>
    data.map((user) => ({
      username: user.username,
      summonerName: user.summoner ? user.summoner.name : '-',
      email: user.email,
      region: user.summoner ? user.summoner.region : '-',
      createdAt: new Date(user.createdAt).toISOString().substr(0, 10),
    })),
};

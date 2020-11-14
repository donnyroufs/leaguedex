module.exports = {
  me: (data) => {
    delete data.password;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.active;
    delete data.permissions;
    return data;
  },
  all: (data) =>
    data.map((user) => ({
      username: user.username,
      summonerName: user.summoner ? user.summoner.name : '-',
      email: user.email,
      region: user.summoner ? user.summoner.region : '-',
      gamesPlayed: user.matchups.length,
      createdAt: new Date(user.createdAt).toISOString().substr(0, 10),
    })),
};

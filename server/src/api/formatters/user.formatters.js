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
      summonerName:
        user.summoner.length > 0
          ? `${user.summoner[0].name} [+${user.summoner.length - 1}]`
          : '-',
      email: user.email,
      region: user.summoner.length > 0 ? user.summoner[0].region : '-',
      gamesPlayed: user.matchups.length,
      createdAt: new Date(user.createdAt).toISOString().substr(0, 10),
    })),
};

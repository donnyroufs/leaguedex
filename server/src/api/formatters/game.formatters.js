module.exports = {
  initialNotifications: (games) => {
    return games.map(({ id, me, championA, opponent, championB, win }) => ({
      id,
      me: {
        win,
        championA: {
          id: championA.id,
          name: championA.name,
        },
        lane: me.timeline.lane,
      },
      opponent: {
        win: !win,
        championB: {
          id: championB.id,
          name: championB.name,
        },
        lane: opponent.timeline.lane,
      },
    }));
  },
};

module.exports = {
  initialNotifications: (games) => {
    return games
      .map(({ id, me, timestamp, championA, opponent, championB, win }) => ({
        id,
        timestamp,
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
      }))
      .sort((a, b) => b.timestamp - a.timestamp);
  },
};

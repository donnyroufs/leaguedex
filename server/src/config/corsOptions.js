const corsOptions = (inProduction, whitelist) => {
  if (inProduction) {
    return {
      origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    };
  } else {
    return {
      credentials: true,
    };
  }
};

module.exports = corsOptions;

const express = require("express");
const app = express();

const routes = require('./lib/routes.js');
const service = require('./lib/service.js');

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const defaultConfig = {
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/workout-tracker'
  },
  http: {
    port: process.env.HTTP_PORT || 3001
  }
};

const init = function (config) {
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!')
  });

  return service.init(config)
      .then(() => {
        routes.init(app);
      });
};

module.exports.app = app;

const start = module.exports.start = function (config) {
  return init(config)
      .then(() => {
        const port = config.http.port;
        app.server = app.listen(port, () => {
          console.log(`Server running @ http://localhost:${port}/`);
        });
      });
};

const stop = module.exports.stop = function () {
  const closed = app.server.close();
  console.log("Server stopped");
};

if (require.main === module) {
  start(defaultConfig);
}

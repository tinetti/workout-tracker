const assert = require('assert');
const express = require("express");

const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const config = {
  mongo: {
    url: 'mongodb://localhost:27017/workout-tracker'
  }
};
require('./lib/service.js').init(config);
require('./lib/routes.js').init(app);
require('./lib/data.js').init(app);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});

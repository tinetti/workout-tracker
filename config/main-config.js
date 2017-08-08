// *** main dependencies *** //
const bodyParser = require('body-parser');

// *** load environment variables from .env *** //
require('dotenv').config();

module.exports.init = function (app, express) {
  // *** app middleware *** //
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
};

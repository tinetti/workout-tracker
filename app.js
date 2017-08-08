// *** dependencies *** //
const express = require('express');

const appConfig = require('./config/main-config.js');
const routeConfig = require('./config/route-config.js');
const errorConfig = require('./config/error-config.js');

// *** express instance *** //
const app = express();

// *** config *** //
appConfig.init(app, express);
routeConfig.init(app);
errorConfig.init(app);

module.exports = app;


// const assert = require('assert');
// const express = require("express");
//
// const app = express();
//
// app.set("port", process.env.PORT || 3001);
//
// // Express only serves static assets in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
//
// require('./lib/routes.js').init(app);
// require('./lib/data.js').init(app);
//
// app.listen(app.get("port"), () => {
//   console.log(`Find the server at: http://localhost:${app.get("port")}/`);
// });

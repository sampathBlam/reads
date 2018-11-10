'use strict';

var SwaggerExpress = require('swagger-express-mw');
var swaggerConfig = {
  appRoot: __dirname // required config
};

const app = require('./api');
const config = require('./lib/config');
const logger = require('./lib/logger');
const log = logger(config.logger);

var mongoose = require('mongoose');

/**
 * Method to initialize Mongo DB
 */
var initializeMongoose = function () {
  // Connect Mongo DB 

  // Set NodeJS promise as the promise for mongoose.
  mongoose.Promise = global.Promise;
  var mongoserverURL = process.env.MONGODB_URL || 'localhost';
  var mongocredentials = '';
  if (process.env.MONGODB_USER && process.env.MONGODB_PWD) {
    mongocredentials = process.env.MONGODB_USER + ':' + process.env.MONGODB_PWD + '@';
  }
  mongoose.connect('mongodb://' + mongocredentials + mongoserverURL + ':27017/reads-db', { useNewUrlParser: true, useCreateIndex: true}, function (err) {
    if (err) {
      log.error('Error in connecting to mongo db : ' + err);
    } else {
      log.info('Connected to reads-db');
    }
  });
}

initializeMongoose();

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(config.api.port || '3000');

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      log.fatal(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log.fatal(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  log.debug(`Listening on ${bind}`);
}

app.on('error', onError);
app.on('listening', onListening);

SwaggerExpress.create(swaggerConfig, function (err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/books']) {
    log.info(`Server started at port ${port}`);
  }
});

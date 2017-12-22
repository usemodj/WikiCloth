/**
 * Main application file
 */

'use strict';

import express from 'express';
import config from './config/environment';
import http from 'http';
import mongoose from 'mongoose';
import {Promise} from 'bluebird';

// fix for event emitters / memory leak error
// https://github.com/npm/npm/issues/13806
require('events').EventEmitter.defaultMaxListeners = Infinity;

// change mongoose to use NodeJS global promises to supress promise deprication warning.
// and to use NodeJS's Promises.
// https://github.com/Automattic/mongoose/issues/4291
// mongoose.Promise = global.Promise;

// Use `bluebird` as default Promise Library
mongoose.Promise = Promise;

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});
// Show mongoose query
if(config.mongo.debug) { mongoose.set('debug', true); }

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
var env = app.get('env');
// Populate databases with admin user
if ('production' === env) {require('./config/seed.admin');}

require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;

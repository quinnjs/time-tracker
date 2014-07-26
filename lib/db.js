'use strict';

var Promise = require('bluebird');
var pg = require('pg');

var connect = Promise.promisify(pg.connect, pg);

function defaultDB() {
  var env = process.env.NODE_ENV || 'development';
  return 'postgres://localhost:5432/ttrack_' + env;
}

var connectionString = process.env.DATABASE_URL || defaultDB();

var client = connect(connectionString).then(function(rawClient) {
  return Promise.promisifyAll(rawClient[0]);
});

function queryAsync() {
  var args = arguments;
  return client.then(function(c) {
    return c.queryAsync.apply(c, args);
  });
}

var db = module.exports = {
  client: client,
  queryAsync: queryAsync
};

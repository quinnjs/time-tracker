#!/usr/bin/env node
'use strict';

var Promise = require('bluebird');

// Override default connection string with one that does not need a db
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432';

var db = require('../lib/db');

Promise.all([
  createSchema('ttrack_development'),
  createSchema('ttrack_test')
]).done(function() {
  console.log('ok');
  process.exit(0);
});

function createSchema(name) {
  return db.queryAsync('create database ' + name)
    .catch(function(err) {
      // that's the code for "already exists"
      if (err.cause && err.cause.code === '42P04') return;
      return Promise.reject(err);
    });
}

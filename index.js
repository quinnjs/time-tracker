'use strict';

require('node-jsx').install({
  extension: '.jsx',
  harmony: true
});

var quinn = require('quinn');
var route = require('quinn-router').route;

var mods = require('./lib/mods')({
  track: require('./mods/track')
});

var staticFiles = require('./lib/static')(__dirname + '/public');

module.exports = quinn.firstHandler(
  staticFiles,
  route(mods.routes)
);

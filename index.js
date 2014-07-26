'use strict';

require('node-jsx').install({
  extension: '.jsx',
  harmony: true
});

var route = require('quinn-router').route;

var mods = require('./lib/mods')({
  track: require('./mods/track')
});

module.exports = route(mods.routes);

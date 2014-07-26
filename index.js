'use strict';

var route = require('quinn-router').route;

module.exports = route(require('./conf/routes'));

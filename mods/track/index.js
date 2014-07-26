'use strict';

var respond = require('quinn-respond');
var Promise = require('bluebird');
var async = Promise.coroutine;

var render = require('../../lib/render');

var getTracks = require('./service').getTracks;
var TrackPage = require('./views/track-page');

exports.routes = function(router) {
  router.GET('/api/v1/tracks', function() {
    return getTracks().then(respond.json);
  });

  router.GET('/', async(function*() {
    return render(TrackPage({
      tracks: getTracks()
    }));
  }));
};

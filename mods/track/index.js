'use strict';

var respond = require('quinn-respond');
var Promise = require('bluebird');
var async = Promise.coroutine;
var concat = require('concat-stream');

var render = require('../../lib/render');

var getTracks = require('./service').getTracks;
var getTrack = require('./service').getTrack;
var stopTrack = require('./service').stopTrack;
var createTrack = require('./service').createTrack;
var TrackPage = require('./views/track-page');

function parseJSON(readable) {
  return new Promise(function(resolve, reject) {
    readable.pipe(concat(function(body) {
      try {
        resolve(JSON.parse(body));
      } catch (parseError) {
        reject(parseError);
      }
    }));
    readable.on('error', reject);
  });
}

exports.routes = function(router) {
  router.GET('/api/v1/tracks', function() {
    return getTracks().then(respond.json);
  });

  router.PUT('/api/v1/tracks/:id', async(function*(req, params) {
    var results = yield Promise.all([ getTrack(params.id), parseJSON(req) ]);
    var track = results[0], body = results[1];

    if (body.end) {
      return stopTrack(track, body.end)
        .then(respond.json);
    }
    return respond.json(track);
  }));

  router.POST('/api/v1/tracks', async(function*(req, params) {
    var body = yield parseJSON(req);
    var start = body.start ? new Date(body.start) : new Date();
    var title = body.title;
    if (!title) {
      throw new Error('title is required');
    }
    return createTrack(title, start).then(respond.json);
  }));

  router.GET('/', function() {
    return render(TrackPage({
      tracks: getTracks()
    }));
  });
};

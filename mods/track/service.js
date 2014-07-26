'use strict';

var _ = require('lodash');

var db = require('../../lib/db');

function fromDB(track) {
  return {
    id: track.track_id,
    title: track.track_title,
    start: track.track_start,
    end: track.track_end
  }
}

var fromDBArray = _.partialRight(_.map, fromDB);

exports.getTracks = function getTracks(opts) {
  opts = opts || {};
  var offset = opts.offset || 0;
  var limit = opts.limit || 20;

  return db
    .queryAsync('select * from tracks offset $1 limit $2', [offset, limit])
    .then(_.property('rows'))
    .then(fromDBArray);
};

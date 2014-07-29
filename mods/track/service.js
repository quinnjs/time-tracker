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
    .queryAsync('select * from tracks offset $1 limit $2;', [offset, limit])
    .then(_.property('rows'))
    .then(fromDBArray);
};

exports.getTrack = function getTrack(id) {
  return db
    .queryAsync('select * from tracks where track_id = $1;', [ id ])
    .then(function(result) {
      if (result.rowCount) {
        return fromDB(result.rows[0]);
      } else {
        throw new Error('Not found');
      }
    });
};

exports.createTrack = function createTrack(title, start) {
  return db
    .queryAsync(
      'insert into tracks (track_title, track_start) ' +
      'values ($1, $2) returning track_id;',
      [ title, start ]
    )
    .then(function(result) {
      if (result.rowCount) {
        return {
          id: result.rows[0].track_id,
          title: title,
          start: start,
          end: null
        };
      }
      throw new Error('Failed to insert');
    });
};

exports.stopTrack = function stopTrack(track, end) {
  end = new Date(end);

  return db
    .queryAsync('update tracks set track_end = $1 where track_id = $2;',
                [ end, track.id ])
    .then(function(results) {
      track.end = end;
      return track;
    });
}

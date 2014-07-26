var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('tracks', {
    track_id: { type: type.BIG_INTEGER, primaryKey: true, autoIncrement: true },
    track_title: { type: type.STRING, notNull: true },
    track_start: { type: type.TIMESTAMP, notNull: true },
    track_end: { type: type.TIMESTAMP }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('tracks', callback);
};

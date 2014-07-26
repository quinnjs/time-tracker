'use strict';

var Promise = require('bluebird');

var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

var respond = require('quinn-respond');

function detectMime(filename) {
  return 'application/javascript; charset=utf-8';
}

module.exports = function staticFiles(dir) {
  return function(req, params) {
    var pathname = req.url.split('?')[0].substr(1);
    var absolute = path.join(dir, pathname);

    return fs.statAsync(absolute)
      .then(function(stats) {
        if (!stats.isFile()) return;

        return fs.createReadStream(absolute)
          .pipe(respond())
          .header('Content-Type', detectMime(absolute));
      })
      .catch(function(err) {
        if (err.cause && err.cause.code === 'ENOENT') return;
        return Promise.reject(err);
      });
  };
};

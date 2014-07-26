'use strict';

module.exports = function(router) {
  router.GET('/', function() {
    return { body: 'ok' };
  });
};

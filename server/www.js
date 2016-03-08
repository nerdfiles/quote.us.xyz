(function() {
  var Promise, app, express;

  Promise = require('bluebird');

  express = require('express');

  app = 'blocknext';

  Promise.resolve(express()).then(require('../' + app + '/server')).then(require('../' + app + '/interface')).then(require('../' + app + '/middleware')).then(require('../' + app + '/theme')).then(require('../' + app + '/start'));

}).call(this);

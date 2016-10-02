var express = require('express');
var fs = require('fs');
var https = require('https');
var querystring = require('querystring');
var DEBUG = require('../debug');

var router = express.Router({ mergeParams: true });
module.exports = router;

router.api = function (req, res) {
  if (!req.session.access_token) {
      res.redirect('../authenticate');
  }
  var redirect_url = req.query.api;
  var rest_verb = req.query.verb;
  res.redirect(url + '?access_token=' + req.session.access_token);
};

router.use('/', router.api);
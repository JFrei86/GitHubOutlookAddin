var express = require('express');
var fs = require('fs');
var https = require('https');
var querystring = require('querystring');
var tedious = require('tedious');
var DEBUG = require('../debug');
var TYPES = tedious.TYPES;

var REFRESH_MINIMUM = 60;

var router = express.Router({ mergeParams: true });
module.exports = router;

var clientSecret = "";
getClientSecret = function () {
  if (clientSecret === "") {
    if (DEBUG == true) {
      var secrets = require('../config/credentials');
      clientSecret = secrets
    }
    else {
      clientSecret = process.env.ClientSecretJson;
    }
  }
  return clientSecret;
};

router.callback = function (req, res) {
  var secrets = getClientSecret();
  var data = querystring.stringify({
    code: req.query.code,
    client_id: secrets.client_id.toString(),
    client_secret: secrets.client_secret.toString(),
  });
  var options = {
    host: 'github.com',
    path: '/login/oauth/authorize',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length
    }
  };
  router.res = res;
  var httpPost = https.request(options, function (response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      exchanges = JSON.parse(str);
      saveToken(req.query.state, exchanges);
    });
  });
  httpPost.write(data);
  httpPost.end();
  res.redirect("../done");

};
router.use('/callback', router.callback);


router.authorize = function (req, res) {

  router.credentials = getClientSecret();
  var authParams = {
    redirect_uri: router.credentials.redirect_uri,
    client_id: router.credentials.client_id,
    scope: 'user,repo',
    state: req.query.state
  };
  var authBaseUrl = router.credentials.auth_uri;
  var url = authBaseUrl + '?' + querystring.stringify(authParams).toString();
  res.redirect(url);

};
router.use('/', router.authorize);
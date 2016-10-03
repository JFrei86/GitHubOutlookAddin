var path = require('path');
var express = require('express');
var webpack = require('webpack');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var config = require('./config/webpack.prod');
var authenticate = require('./routes/authenticate');
var DEBUG = require('./debug');
var url = require('url');
var secret = require('./config/credentials').client_secret;

var app = express();
var compiler = webpack(config);
var port = process.env.PORT || 3000;

app.use(session({
  cookieName: 'githubAddin', // cookie name dictates the key name added to the request object
  requestKey: 'session',
  secret: secret, // should be a large unguessable string
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  path: '/',
  ephemeral: false, // when true, cookie expires when the browser closes
  httpOnly: true, // when true, cookie is not accessible from javascript
  secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
}));

app.use(bodyParser.json());         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// Routers

app.use('/authenticate', authenticate);
app.use('/public', express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/static'));

app.get('*', function (req, res) {
  if (req.session.access_token || req.query.authFlow) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.redirect('./github?authFlow=true');
  }
});

if(DEBUG == true){
  var https = require('https');
  var fs = require('fs');

  const options = {
    //key: fs.readFileSync('secrets/key.pem'),
    //cert: fs.readFileSync('secrets/cert.pem')
  };

  app.listen(port, function() {
    console.log('Listening at https://localhost:' + port);
  });
}
else{
  console.log("WARNING: you are not running in debug mode. nothing will work!");
  app.listen(port, "localhost", function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Listening at http://localhost:' + port);
  });
}

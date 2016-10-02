var path = require('path');
var express = require('express');
var webpack = require('webpack');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var config = require('./config/webpack.prod');
var authenticate = require('./routes/authenticate');
var DEBUG = require('./debug');
var url = require('url');
var secret = require('./config/credentials').client_secret;

var app = express();
var compiler = webpack(config);
var port = process.env.PORT || 3000;

app.use(session({
  secret: secret,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: null }
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
  res.sendFile(path.join(__dirname, 'index.html'));
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

var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var isProduction = process.env.NODE_ENV === 'production';

var proxy = httpProxy.createProxyServer();
var app = express();
var Router = require('./mock');

var port = process.env.PORT || 3000;
var publicPath = path.resolve(__dirname, '../dist');

app.use(express.static(publicPath));

// write your fake server in Router!!!
app.use(Router);

// We require the bundler inside the if block because
// it is only needed in a development environment.
if (!isProduction) {
  // proxy all assets to webpack dev server
  app.all('/*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });
}

app.listen(port, function () {
  console.log('Server running on port ' + port);
});

// TODO: Somehow integrate nodemon + webpack hot middleware. Check out https://github.com/glenjamin/ultimate-hot-reloading-example
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');

// Webpack stuff
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = process.env.WEBPACK_CONFIG ? 
  require(process.env.WEBPACK_CONFIG) : require('./webpack.config');
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

// Standard Express stuff
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Not sure what require.main does though. What about production?
if (require.main === module) {
  const server = app.listen(process.env.PORT || 3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening on http://%s:%s', host, port) ;
  });
}

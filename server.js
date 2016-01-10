// TODO: Somehow integrate nodemon + webpack hot middleware. Check out https://github.com/glenjamin/ultimate-hot-reloading-example
// TODO: Hot reload when HTML changes... (Maybe BrowserSync?)
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');

// Standard Express stuff
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Development with Webpack
if (!process.env.production) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig =  require('./webpack.config').development;
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {colors: true}
  }));
  app.use(webpackHotMiddleware(compiler));
  app.use(logger('dev'));
  app.use(express.static(__dirname + '/views'));
}

if (process.env.production) {
  app.use(express.static(__dirname + '/public'));
}

// Not sure what require.main does though. What about production?
if (require.main === module) {
  const server = app.listen(process.env.PORT || 3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening on http://%s:%s', host, port) ;
  });
}

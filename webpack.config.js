var webpack = require('webpack');
var path = require('path');

var mod = {
  loaders: [{
    test: /\.jsx?$/,
    exclude: /(node_modules)/,
    loader: 'babel-loader',
  }, {
    test: /\.scss$/,
    exclude: /(bower_components)/,
    loaders: [
      'style',
      'css?sourceMap',
      'autoprefixer?browsers=last 2 versions',
      'sass?sourceMap'
    ]
  }],
};

var sassLoader = {
  includePaths: [
    path.resolve(__dirname, './node_modules'),
    path.resolve(__dirname, './bower_components')
  ]
};

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin()
];

var development = {
  context: __dirname,
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './src/js/main.js'
  ],
  output: {
    path: '/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: '#source-map',
  module: mod,
  sassLoader: sassLoader,
  plugins: plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ]),
  stats: {
    colors: true
  }
};

var production = {
  context: __dirname,
  entry: ['./src/js/main.js'],
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  devtool: '#source-map',
  module: mod,
  sassLoader: sassLoader,
  plugins: plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compressor: {warnings: false}
    }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ]),
  stats: {
    colors: true
  }
};

module.exports = production;
module.exports.development = development;
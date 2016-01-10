var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './public/js/main.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  devtool: '#source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
    }],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

// Webpack production plugins
// new webpack.optimize.UglifyJsPlugin({
//   compressor: { warnings: false }
// }),
// new webpack.DefinePlugin({
//   'process.env': {NODE_ENV: JSON.stringify('production')}
// }),
// new webpack.optimize.AggressiveMergingPlugin(),
// new webpack.NoErrorsPlugin()

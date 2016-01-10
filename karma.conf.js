// Karma configuration
// Generated on Sun Jan 10 2016 01:27:22 GMT+0800 (SGT)
var webpackConfig = require('./webpack.config.js');

webpackConfig = Object.assign({}, {
  devtool: webpackConfig.devtool,
  module: webpackConfig.module,
  plugins: webpackConfig.plugins
});

console.log(webpackConfig);
module.exports = function(config) {
  config.set({
    basePath: '',
    // Note: switch to Jasmine if you prefer Jasmine
    frameworks: ['mocha', 'sinon-chai'],

    files: [
      'test/index.js'
    ],

    exclude: [],

    preprocessors: {
      'test/index.js': ['webpack']
    },

    reporters: ['nyan'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,

    autoWatch: true,

    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    webpack: webpackConfig,
  });
};

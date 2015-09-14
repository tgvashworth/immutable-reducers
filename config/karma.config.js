'use strict';

var constants = require('./constants');
var webpackConfig = require('./webpack.config.test');
// entry is determined by karma config 'files' array
webpackConfig.entry = {};

module.exports = function (config) {
  config.set({
    basePath: constants.ROOT_DIRECTORY,
    browsers: [ process.env.TRAVIS ? 'Firefox' : 'Chrome' ],
    browserNoActivityTimeout: 60000,
    client: {
      captureConsole: true,
      mocha: {
        ui: 'bdd'
      },
      useIframe: true
    },
    files: [
      'src/specs.context.js'
    ],
    frameworks: [
      'mocha'
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],
    preprocessors: {
      'src/specs.context.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'dots' ],
    singleRun: true,
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: {
        assetsSort: 'name',
        colors: true,
        children: false,
        chunks: false,
        modules: false
      }
    }
  });
};

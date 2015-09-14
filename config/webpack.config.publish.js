var assign = require('object-assign');
var constants = require('./constants');
var baseConfig = require('./webpack.config');

module.exports = assign(baseConfig, {
  output: {
    filename: 'immutable-reducers.js',
    library: 'ImmutableReducers',
    libraryTarget: 'commonjs2',
    path: constants.BUILD_DIRECTORY
  }
});

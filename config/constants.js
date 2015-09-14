var path = require('path');

var ROOT_DIRECTORY = path.resolve(__dirname, '..');
var BUILD_DIRECTORY = path.resolve(ROOT_DIRECTORY, 'dist');

module.exports = {
  ROOT_DIRECTORY: ROOT_DIRECTORY,
  BUILD_DIRECTORY: BUILD_DIRECTORY
};

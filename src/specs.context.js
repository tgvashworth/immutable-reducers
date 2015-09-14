/**
 * Since we use webpack-specific features in our modules (e.g., loaders,
 * plugins, adding CSS to the dependency graph), we must use webpack to build a
 * test bundle.
 *
 * This module creates a context of all the unit test files (as per the unit
 * test naming convention). It's used as the webpack entry file for unit tests.
 *
 * See: https://github.com/webpack/docs/wiki/context
 */

const specsContext = require.context('.', true, /.+\.spec\.js$/);
specsContext.keys().forEach(specsContext);
module.exports = specsContext;

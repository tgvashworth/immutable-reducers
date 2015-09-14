var webpack = require('webpack');

var DedupePlugin = webpack.optimize.DedupePlugin;
var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var plugins = [
  new DedupePlugin(),
  new OccurenceOrderPlugin()
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new UglifyJsPlugin({
      compress: {
        dead_code: true,
        drop_console: true,
        screw_ie8: true,
        warnings: true
      }
    })
  );
}

module.exports = {
  entry: './src',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    path: './dist',
    filename: 'immutable-reducers.js'
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ]
  },
  plugins: plugins
};

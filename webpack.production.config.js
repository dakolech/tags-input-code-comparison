const webpack = require('webpack');
const sharedWebpack = require('./webpack.shared');

module.exports = {
  entry: sharedWebpack.entry(),
  output: sharedWebpack.output,
  module: {
    loaders: sharedWebpack.loaders
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  postcss: sharedWebpack.postcss
};

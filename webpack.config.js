const webpack = require('webpack');
const sharedWebpack = require('./webpack.shared');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = {
  devtool: 'source-map',
  cache: true,
  debug: true,
  watch: true,
  entry: sharedWebpack.entry('dev'),
  output: sharedWebpack.output,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ForkCheckerPlugin()
  ],
  module: {
    loaders: sharedWebpack.loaders
  },
  postcss: sharedWebpack.postcss
};

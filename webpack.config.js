import webpack from 'webpack';
import sharedWebpack from './webpack.shared';

export default {
  cache: true,
  debug: true,
  watch: true,
  entry: sharedWebpack.entry('dev'),
  output: sharedWebpack.output,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: sharedWebpack.loaders
  }
};

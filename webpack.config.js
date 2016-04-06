import webpack from 'webpack';
import sharedWebpack from './webpack.shared';

export default {
  devtool: 'source-map',
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
  },
  postcss: sharedWebpack.postcss,
      preLoaders: [

      // Tslint loader support for *.ts files
      //
      // See: https://github.com/wbuchwalter/tslint-loader
      // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] },

      // Source map loader support for *.js files
      // Extracts SourceMaps for source files that as added as sourceMappingURL comment.
      //
      // See: https://github.com/webpack/source-map-loader
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
        ]
      }

    ],
};

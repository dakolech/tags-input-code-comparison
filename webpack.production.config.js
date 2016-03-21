var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    angular: [
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'src/angular/tags-input.module.js')
    ]
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]/app.js',
    publicPath: '/'
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
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
    ]
  }
};
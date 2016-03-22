const path = require('path');

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

  loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
    ],
}
const path = require('path');

module.exports = {
  entry: (env) => {
    const entries = {
      angular: [
        path.join(__dirname, 'src/angular/tags-input.module.js')
      ]
    }

    if (env === 'dev') {
      for (const key in entries) {
        if (entries.hasOwnProperty(key)) {
          entries[key].push('webpack-hot-middleware/client?reload=true');
        }
      }
    }

    return entries;
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
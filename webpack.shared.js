const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: (env) => {
    const entries = {
      angular: [
        path.join(__dirname, 'src/angular/tags-input.module.js')
      ],
      'angular-rx': [
        path.join(__dirname, 'src/angular-rx/tags-input.module.js')
      ],
      angular2: [
        path.join(__dirname, 'src/angular2/bootstrap.js')
      ],
      'angular2-ts': [
        path.join(__dirname, 'src/angular2-ts/bootstrap.ts')
      ],
      shared: [
        path.join(__dirname, 'src/shared/app.js')
      ]
    };

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
      test: /\.js$/,
      include: path.join(`${__dirname}/src`),
      loader: 'babel'
    }, {
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      include: path.join(`${__dirname}/src`),
      exclude: /node_modules\/rxjs$/
    }, {
      test: /\.jade$/,
      loader: 'jade',
      include: path.join(`${__dirname}/src`)
    }, {
      test: /\.scss$/,
      loader: 'style!css!postcss!resolve-url!sass?sourceMap',
      include: path.join(`${__dirname}/src`)
    }, {
      test: /\.css$/,
      loader: 'style!css!resolve-url'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'file'
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff2"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=image/svg+xml"
    }
  ],

  postcss: function() {
    return [autoprefixer];
  }
};

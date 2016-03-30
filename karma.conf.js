const sharedWebpack = require('./webpack.shared');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/rx/dist/rx.all.js',
      'node_modules/rx-angular/dist/rx.angular.js',
      'src/**/*.spec.js'
    ],
    autoWatch: true,
    browsers: ['Chrome'],
    reporters: ['progress'],
    preprocessors: {
      'src/**/*.spec.js': ['webpack', 'sourcemap']
    },
    webpack: {
      cache: true,
      debug: true,
      watch: true,
      devtool: 'inline-source-map',
      isparta: {
        embedSource: true,
        noAutoWrap: true,
        babel: {
          presets: ['es2015']
        }
      },
      module: {
        preLoaders: [{
          test: /\.js?$/,
          exclude: /(node_modules)/,
          loader: 'isparta'
        }],
        loaders: sharedWebpack.loaders
      }
    },
    webpackMiddleware: {
      noInfo: true,
      stats: {
        colors: true
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    singleRun: false
  });
};

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/**/*.jade',
      'src/**/*.spec.js'
    ],
    autoWatch: true,
    browsers: ['Chrome'],
    reporters: ['progress'],
    preprocessors: {
      'src/**/*.spec.js': ['webpack', 'sourcemap'],
      'src/**/*.jade': ['ng-jade2js']
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
    singleRun: false,
    ngJade2JsPreprocessor: {
      moduleName: 'templates',
      stripPrefix: 'src/angular/'
    }
  });
};

const app = require('./app');

const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');

/* eslint-disable new-cap */
const server = require('http').Server(app);
/* eslint-enable new-cap */
const io = require('socket.io')(server);
const socketFiles = require('./socket-files');

const path = require('path');
const bodyParser = require('body-parser');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 4001;

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    hot: true,
    inline: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static('dist'));
}
app.use(bodyParser.json());

app.use(express.static('src/shared/images'));

app.set('views', path.join(__dirname, '../'));
app.set('view engine', 'jade');


io.on('connection', (socket) => {
  socketFiles.init(socket);
});

server.listen(port);

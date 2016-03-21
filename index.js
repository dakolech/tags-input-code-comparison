import express from 'express';
import path from 'path';

const app = express();

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';

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

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static('css'));
app.use(express.static('src'));

app.use(express.static('node_modules/angular'));
app.use(express.static('node_modules/bootstrap/dist/css'));

app.get('/tags', (req, res) => {
  res.sendFile(path.join(__dirname, '/tags/all.json'));
})

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/angular', (req, res) => {
  res.render('src/angular/index');
});

app.get('/angular/tags-input', (req, res) => {
  res.render('src/angular/component/tags-input');
});

app.listen(4000);

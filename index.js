import express from 'express';
import path from 'path';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';

import bodyParser from 'body-parser';

import fs from 'fs';
import tagsFile from './tmp/tags/all';

const tagsFileName = './tmp/tags/all.json';

const app = express();

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

app.use(bodyParser.json());

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static('css'));
app.use(express.static('src'));

app.use(express.static('node_modules/angular'));
app.use(express.static('node_modules/bootstrap/dist/css'));


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/angular', (req, res) => {
  res.render('src/angular/index');
});

app.get('/angular/component/tags-input.html', (req, res) => {
  res.render('src/angular/component/tags-input');
});


app.get('/tags', (req, res) => {
  res.sendFile(path.join(__dirname, '/tmp/tags/all.json'));
});

app.post('/tags', (req, res) => {
  const id = tagsFile[tagsFile.length - 1].id + 1;
  const newTag = {
    id: id,
    name: req.body.name
  };

  tagsFile.push(newTag);

  fs.writeFile(tagsFileName, JSON.stringify(tagsFile, null, 2), (err) => {
    if (err) res.status(400).send(err);
    res.status(200).send(newTag);
  });
});

app.listen(4000);

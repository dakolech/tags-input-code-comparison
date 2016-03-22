import express from 'express';
import app from './app';

/* eslint-disable no-unused-vars */
import tagsRoutes from './tags/tags.routes';
import angularRoutes from './angular/angular.routes';
/* eslint-enable no-unused-vars */

app.use(express.static('css'));
app.use(express.static('src'));

app.use(express.static('node_modules/angular'));
app.use(express.static('node_modules/bootstrap/dist/css'));

app.get('/', (req, res) =>
  res.render('index')
);

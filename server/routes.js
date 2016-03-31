import app from './app';

/* eslint-disable no-unused-vars */
import tagsRoutes from './tags/tags.routes';
import angularRoutes from './angular/angular.routes';
import angularRxRoutes from './angular-rx/angular-rx.routes';
/* eslint-enable no-unused-vars */

app.get('/', (req, res) =>
  res.render('src/shared/index')
);

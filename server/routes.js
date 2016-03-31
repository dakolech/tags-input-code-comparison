import app from './app';

/* eslint-disable no-unused-vars */
import tagsRoutes from './tags/tags.routes';
/* eslint-enable no-unused-vars */

app.get('/', (req, res) =>
  res.render('src/shared/index')
);

app.get('/angular', (req, res) =>
  res.render('src/angular/index')
);

app.get('/angular-rx', (req, res) =>
  res.render('src/angular-rx/index')
);

app.get('/vanillajs', (req, res) =>
  res.render('src/vanillajs/index')
);

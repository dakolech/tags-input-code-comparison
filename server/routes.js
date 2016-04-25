const app = require('./app');

require('./tags/tags.routes');

app.get('/', (req, res) =>
  res.render('src/shared/index')
);

app.get('/angular', (req, res) =>
  res.render('src/angular/index')
);

app.get('/angular-rx', (req, res) =>
  res.render('src/angular-rx/index')
);

app.get('/angular2', (req, res) =>
  res.render('src/angular2/index')
);

app.get('/angular2-ts', (req, res) =>
  res.render('src/angular2-ts/index')
);

app.get('/*', (req, res) =>
  res.render('src/shared/index')
);

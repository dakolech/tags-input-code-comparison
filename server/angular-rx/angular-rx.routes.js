import app from '../app';

app.get('/angular-rx', (req, res) =>
  res.render('src/angular-rx/index')
);

app.get('/angular-rx/component/tags-input.html', (req, res) =>
  res.render('src/angular-rx/component/tags-input')
);

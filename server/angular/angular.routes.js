import app from '../app';

app.get('/angular', (req, res) =>
  res.render('src/angular/index')
);

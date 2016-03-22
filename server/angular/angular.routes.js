import app from '../app';

app.get('/angular', (req, res) => {
  res.render('src/angular/index');
});

app.get('/angular/component/tags-input.html', (req, res) => {
  res.render('src/angular/component/tags-input');
});

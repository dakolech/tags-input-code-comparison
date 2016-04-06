const app = require('../app');

const path = require('path');
const fs = require('fs');

const tagsFile = require('../../tmp/tags/all');

const tagsFileName = '../../tmp/tags/all.json';

app.get('/tags', (req, res) =>
  res.sendFile(path.join(__dirname, tagsFileName))
);

app.post('/tags', (req, res) => {
  const id = tagsFile[tagsFile.length - 1].id + 1;
  const newTag = {
    id: id,
    name: req.body.name
  };

  tagsFile.push(newTag);

  fs.writeFile(path.join(__dirname, tagsFileName), JSON.stringify(tagsFile, null, 2), (err) => {
    if (err) {
      res.status(400);
      console.log(err);
    }
    res.status(200).send(newTag);
  });
});

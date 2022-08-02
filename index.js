const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const DATA_TALKERS = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talks = await fs.readFile(DATA_TALKERS, 'utf8');
  const parsedTalkers = JSON.parse(talks);
  if (parsedTalkers && parsedTalkers.length !== 0) {
    return res.status(HTTP_OK_STATUS).json(parsedTalkers);
  }
  return res.status(HTTP_OK_STATUS).json([]);
});

app.listen(PORT, () => {
  console.log('Online');
});

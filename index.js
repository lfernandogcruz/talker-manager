const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { validateEmail, validatePassword,
  generateToken, validateToken, validateName, validateAge, validateTalk,
  validateWatchedAt, validateRate,
} = require('./helpers/ValidatingFunctions');
const { DATA_TALKERS, NOT_FOUND_STATUS, LOGIN_ERROR_STATUS,
  emailNull, pwNull, emailErr, pwErr, ADD_TALKER_STATUS,
} = require('./helpers/constants');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talks = await fs.readFile(DATA_TALKERS, 'utf8');
  const parsedTalkers = JSON.parse(talks);
  if (parsedTalkers && parsedTalkers.length !== 0) {
    return res.status(HTTP_OK_STATUS).json(parsedTalkers);
  }
  return res.status(HTTP_OK_STATUS).json([]);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await fs.readFile(DATA_TALKERS, 'utf8');
  const { id } = req.params;
  const talker = JSON.parse(talkers).find((talkr) => talkr.id === +id);
  if (talker) return res.status(HTTP_OK_STATUS).json(talker);
  return res.status(NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(LOGIN_ERROR_STATUS).json({ message: emailNull });
  if (!password) return res.status(LOGIN_ERROR_STATUS).json({ message: pwNull });
  const validEmail = validateEmail(email);
  const validPassword = validatePassword(password);
  if (!validEmail) return res.status(LOGIN_ERROR_STATUS).json({ message: emailErr });
  if (!validPassword) return res.status(LOGIN_ERROR_STATUS).json({ message: pwErr });
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', validateToken, validateName, validateAge, validateTalk,
  validateWatchedAt, validateRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;
    const talkers = await fs.readFile(DATA_TALKERS, 'utf8');
    const parsedTalkers = JSON.parse(talkers);
    const TALKER_REQ_05 = {
      id: parsedTalkers.length + 1,
      name,
      age,
      talk: {
        watchedAt,
        rate,
      },
    };
    parsedTalkers.push(TALKER_REQ_05);
    await fs.writeFile(DATA_TALKERS, JSON.stringify(parsedTalkers));
    return res.status(ADD_TALKER_STATUS).json(TALKER_REQ_05);
  });

app.listen(PORT, () => {
  console.log('Online');
});

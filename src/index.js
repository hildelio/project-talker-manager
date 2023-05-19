const express = require('express');
const bodyParser = require('body-parser');
// const crypto = require('crypto');

const app = express();

const { readFile, generateToken, validateEmail, nextId, writeFile } = require('./assets/utils');
const { validateToken } = require('./middlewares/talker/validations/validateToken.mdw');
const { validateName } = require('./middlewares/talker/validations/validateName.mdw');
const { validateAge } = require('./middlewares/talker/validations/validateAge.mdw');
const { validateTalk, validateTalkWatchedAt, validateTalkRate } = require('./middlewares/talker/validations/validateTalk.mdw');

app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Req 01
app.get('/talker', async (_req, res) => {
  const talkers = await readFile();
  return res.status(HTTP_OK_STATUS).json(talkers || []);
});

// Req 02
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const getTalker = talkers.find((talker) => talker.id === Number(id));
  if (!getTalker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });    
  }
  return res.status(HTTP_OK_STATUS).json(getTalker);
});

// Req 03 e 04
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const isValidEmail = validateEmail(email);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!isValidEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
    const token = generateToken(16);
    return res.status(200).json({ token });
});

// Req 05
app.post('/talker', 
validateToken, 
validateName, 
validateAge,
validateTalk,
validateTalkWatchedAt,
validateTalkRate,
async (req, res) => {
  // const { name, age, talk } = req.body;
  const talkers = await readFile();
  const newTalker = {
    id: nextId(talkers),
    ...req.body, 
  };

  talkers.push(newTalker);
  await writeFile(talkers);
  return res.status(201).json(newTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});

const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();

const { readFile } = require('./assets/utils');

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

// Req 03
app.use(bodyParser.json());

function generateToken(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    token += chars[randomIndex];
  }
  return token;
}

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // const generateToken = crypto.randomBytes(16, (err, buf) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   return buf.toString('hex');
  // });
  if (email && password) {
    const token = generateToken(16);
    res.status(200).json({ token });
  } else {
    res.status(400).json({ error: 'Email and password are required.' });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});

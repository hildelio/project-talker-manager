const express = require('express');

const app = express();

const { readFile } = require('./assets/utils');

app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await readFile();
  return res.status(HTTP_OK_STATUS).json(talkers || []);
});

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

app.listen(PORT, () => {
  console.log('Online');
});

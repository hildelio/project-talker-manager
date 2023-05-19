const { 
  talkNotFound,
  talkWatchedAtNotFound,
  talkWatchedAtRegex,
  talkRateNotFound,
  talkRateType,
} = require('../schemas/validateTalk.schema');

function validateTalk(req, res, next) {
  const { talk } = req.body;
  const talkNotFounded = talkNotFound(talk);
  
  if (talkNotFounded) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
}

function validateTalkWatchedAt(req, res, next) {
  const { talk } = req.body;
  const talkWatchedAtNotFounded = talkWatchedAtNotFound(talk);
  if (talkWatchedAtNotFounded) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  const talkWatchedAtRegexDate = talkWatchedAtRegex(talk);
  if (talkWatchedAtRegexDate) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
}

function validateTalkRate(req, res, next) {
  const { talk } = req.body;
  const talkRateNotFounded = talkRateNotFound(talk);
  if (talkRateNotFounded) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  const talkRateTypes = talkRateType(talk);
  if (talkRateTypes) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
}

module.exports = { validateTalk, validateTalkWatchedAt, validateTalkRate };
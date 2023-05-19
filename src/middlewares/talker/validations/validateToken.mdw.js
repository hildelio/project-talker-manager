const { tokenNotFound, tokenLengthAndType } = require('../schemas/validateToken.schema');

function validateToken(req, res, next) {
  const token = req.headers.authorization;

  const tokenNotFounded = tokenNotFound(token);
  if (tokenNotFounded) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const invalidTokenLengthAndType = tokenLengthAndType(token);
  if (invalidTokenLengthAndType) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
}

module.exports = { validateToken };
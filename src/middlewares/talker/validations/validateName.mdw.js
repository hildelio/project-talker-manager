const { nameNotFound, nameLength } = require('../schemas/validateName.schema');

function validateName(req, res, next) {
  const { name } = req.body;
  const nameNotFounded = nameNotFound(name);
  
  if (nameNotFounded) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  const invalidNameLength = nameLength(name);
  if (invalidNameLength) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

module.exports = { validateName };
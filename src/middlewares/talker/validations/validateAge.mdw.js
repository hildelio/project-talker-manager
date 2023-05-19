const { ageFound, ageType } = require('../schemas/validateAge.schema');

function validateAge(req, res, next) {
  const { age } = req.body;
  const ageFounded = ageFound(age);
  
  if (ageFounded) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  const invalidAgeType = ageType(age);
  if (invalidAgeType) {
    return res.status(400)
      .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
  next();
}

module.exports = { validateAge };
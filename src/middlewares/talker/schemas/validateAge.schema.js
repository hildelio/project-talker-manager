function ageFound(age) {
  return !age || age.toString().trim() === '' || age === undefined || age === null;
}

function ageType(age) {
  if (typeof age !== 'number' || !Number.isInteger(age) || age < 18) {
    return true;
  }
}

module.exports = { ageFound, ageType };
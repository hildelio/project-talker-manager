function nameNotFound(name) {
  return !name || name.trim() === '' || name === undefined || name === null;
}

function nameLength(name) {
  if (name.length < 3) {
    return true;
  }
}

module.exports = { nameNotFound, nameLength };
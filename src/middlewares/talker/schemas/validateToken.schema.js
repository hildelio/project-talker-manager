function tokenNotFound(token) {
  return !token || token === undefined || token === null;
}

function tokenLengthAndType(token) {
  if (token.length !== 16 || typeof token !== 'string') {
    return true;
  }
}

module.exports = { tokenNotFound, tokenLengthAndType };
function talkNotFound(talk) {
  return !talk || Object.keys(talk).length === 0;
}

function talkWatchedAtNotFound(talk) {
  if (!talk.watchedAt || talk.watchedAt.trim() === '') {
    return true;
  }
}

function talkWatchedAtRegex(talk) {
  const watchedAtRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!watchedAtRegex.test(talk.watchedAt)) {
    return true;
  }
}

function talkRateNotFound(talk) {
  if (talk.rate === undefined) {
    return true;
  }
}

function talkRateType(talk) {
  if (typeof talk.rate !== 'number' || !Number.isInteger(talk.rate)
  || talk.rate < 1 || talk.rate > 5) {
    return true;
  }
}

module.exports = {
  talkNotFound, talkWatchedAtNotFound, talkWatchedAtRegex, talkRateNotFound, talkRateType,
};
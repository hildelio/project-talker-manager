const fs = require('fs').promises;
const path = require('path');

const data = path.resolve(__dirname, '../talker.json')

const readFile = async () => {
  const talkerData = await fs.readFile(data);
  return JSON.parse(talkerData);
};

module.exports = { readFile };
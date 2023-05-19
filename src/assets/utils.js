const fs = require('fs').promises;
const path = require('path');

const data = path.resolve(__dirname, '../talker.json');

const readFile = async () => {
  const talkerData = await fs.readFile(data);
  return JSON.parse(talkerData);
};

const writeFile = async (talkers) => {
  await fs.writeFile(data, JSON.stringify(talkers));
};

function generateToken(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    token += chars[randomIndex];
  }
  return token;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function nextId(talkers) {
  return talkers.length + 1;
}

module.exports = { readFile, writeFile, generateToken, validateEmail, nextId };
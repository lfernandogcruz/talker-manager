const crypto = require('crypto');

const validateEmail = (email) => {
  const validateEmailInputRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isplayerEmailValid = validateEmailInputRegex.test(email);
  return isplayerEmailValid;  
};

const validatePassword = (password) => password.length >= 6;

const generateToken = () => crypto.randomBytes(8).toString('hex');

module.exports = {
  validateEmail,
  validatePassword,
  generateToken,
};

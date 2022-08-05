const crypto = require('crypto');
const { tokenNull, tokenErr, TOKEN_ERROR_STATUS, LOGIN_ERROR_STATUS,
  nameNull, nameErr, ageNull, ageErr, talkNull, watchedAtNull, watchedAtErr,
  rateNull, rateErr,
} = require('./constants');

const validateEmail = (email) => {
  const validateEmailInputRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isplayerEmailValid = validateEmailInputRegex.test(email);
  return isplayerEmailValid;  
};

const validatePassword = (password) => password.length >= 6;

const generateToken = () => crypto.randomBytes(8).toString('hex');

// here on we go full Lennon to "Middlewares Fields Forever"
const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(TOKEN_ERROR_STATUS).json({ message: tokenNull });
  const validToken = authorization.length === 16;
  if (!validToken) return res.status(TOKEN_ERROR_STATUS).json({ message: tokenErr });
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(LOGIN_ERROR_STATUS).json({ message: nameNull });
  if (name.length < 3) return res.status(LOGIN_ERROR_STATUS).json({ message: nameErr });
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(LOGIN_ERROR_STATUS).json({ message: ageNull });
  if (+age < 18) return res.status(LOGIN_ERROR_STATUS).json({ message: ageErr });
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) return res.status(LOGIN_ERROR_STATUS).json({ message: talkNull });
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!watchedAt) return res.status(LOGIN_ERROR_STATUS).json({ message: watchedAtNull });
  const dateReg = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const isDateValid = dateReg.test(watchedAt);
  if (!isDateValid) return res.status(LOGIN_ERROR_STATUS).json({ message: watchedAtErr });
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate === undefined) return res.status(LOGIN_ERROR_STATUS).json({ message: rateNull });
  const isRateValid = +rate >= 1 && +rate <= 5;
  if (!isRateValid) return res.status(LOGIN_ERROR_STATUS).json({ message: rateErr });
  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  generateToken,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};

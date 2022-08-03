const DATA_TALKERS = './talker.json';
const NOT_FOUND_STATUS = 404;
const LOGIN_ERROR_STATUS = 400;
const emailNull = 'O campo "email" é obrigatório';
const pwNull = 'O campo "password" é obrigatório';
const emailErr = 'O "email" deve ter o formato "email@email.com"';
const pwErr = 'O "password" deve ter pelo menos 6 caracteres';

module.exports = {
  DATA_TALKERS,
  NOT_FOUND_STATUS,
  LOGIN_ERROR_STATUS,
  emailNull,
  pwNull,
  emailErr,
  pwErr,
};
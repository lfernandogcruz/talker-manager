const DATA_TALKERS = './talker.json';
const NOT_FOUND_STATUS = 404;
const LOGIN_ERROR_STATUS = 400;
const emailNull = 'O campo "email" é obrigatório';
const pwNull = 'O campo "password" é obrigatório';
const emailErr = 'O "email" deve ter o formato "email@email.com"';
const pwErr = 'O "password" deve ter pelo menos 6 caracteres';
const ADD_TALKER_STATUS = 201;
const TOKEN_ERROR_STATUS = 401;
const tokenNull = 'Token não encontrado';
const tokenErr = 'Token inválido';
const nameNull = 'O campo "name" é obrigatório';
const nameErr = 'O "name" deve ter pelo menos 3 caracteres';
const ageNull = 'O campo "age" é obrigatório';
const ageErr = 'A pessoa palestrante deve ser maior de idade';
const talkNull = 'O campo "talk" é obrigatório';
const watchedAtNull = 'O campo "watchedAt" é obrigatório';
const watchedAtErr = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
const rateNull = 'O campo "rate" é obrigatório';
const rateErr = 'O campo "rate" deve ser um inteiro de 1 à 5';

module.exports = {
  DATA_TALKERS,
  NOT_FOUND_STATUS,
  LOGIN_ERROR_STATUS,
  emailNull,
  pwNull,
  emailErr,
  pwErr,
  ADD_TALKER_STATUS,
  TOKEN_ERROR_STATUS,
  tokenNull,
  tokenErr,
  nameNull,
  nameErr,
  ageNull,
  ageErr,
  talkNull,
  watchedAtNull,
  watchedAtErr,
  rateNull,
  rateErr,
};
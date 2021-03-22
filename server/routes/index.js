// ./routes/index.js
const getQuestions = require('./getQuestions')
const getAnswers = require('./getAnswers')

module.exports = app => {
  app.use('/qa/questions', getQuestions)
  app.use('/qa/questions', getAnswers)
}
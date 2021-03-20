// ./routes/index.js
const getQaQuestions = require('./getQaQuestions')

module.exports = app => {
  app.use('/qa/questions', getQaQuestions)
}
// ./routes/index.js
const getQuestions = require('./getQuestions')
const getAnswers = require('./getAnswers')
const postQuestion = require('./postQuestion')
const postAnswer = require('./postAnswer')
const putQuestionHelpful = require('./putQuestionHelpful')
const putAnswerHelpful = require('./putAnswerHelpful')
const putQuestionReported = require('./putQuestionReported')
const putAnswerReported = require('./putAnswerReported')

module.exports = app => {
  app.use('/qa/questions', getQuestions)
  app.use('/qa/questions', getAnswers)
  app.use('/qa/questions', postQuestion)
  app.use('/qa/questions', postAnswer)
  app.use('/qa/questions', putQuestionHelpful)
  app.use('/qa/questions', putAnswerHelpful)
  app.use('/qa/questions', putQuestionReported)
  app.use('/qa/questions', putAnswerReported)

}
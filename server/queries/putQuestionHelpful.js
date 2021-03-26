module.exports = {
  'putQuestionHelpful':

  `
    INSERT INTO qa_answers (question_helpfulness)
    VALUES ($1)
  `


}



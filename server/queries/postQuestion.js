module.exports = {
  'postQuestion':

  `
    INSERT INTO qa_questions (question_body, asker_name, asker_email, product_id)
    VALUES ($1, $2, $3, $4)
  `


}



module.exports = {
  'postAnswer':

  `
    INSERT INTO qa_answers (body, answerer_name, answerer_email)
    VALUES ($1, $2, $3)
  `


}



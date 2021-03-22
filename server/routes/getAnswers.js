const Router = require('express-promise-router')
const db = require('../db')
const router = new Router()

module.exports = router

// Example curl localhost:3000/qa/questions/18203/answers?count=5&page=1

// answer_id AS answer_id, body AS body, date AS date, answerer_name AS answerer_name, helpfulness AS helpfulness


// WHERE question_id = $1 AND reported = false
// answer_id AS answer_id, body AS body, date AS date, answerer_name AS answerer_name, helpfulness AS helpfulness


router.get('/:question_id/answers', async (req, res) => {
  const { question_id } = req.params;
  const { count } = req.query;
  const { page } = req.query;

  const { rows } = await db.query(`
  SELECT qa_answers.answer_id AS answer_id, qa_answers.body AS body, qa_answers.date AS date, qa_answers.answerer_name AS answerer_name, qa_answers.helpfulness AS helpfulness,
    JSON_AGG(
      ROW_TO_JSON(
          ( SELECT r
              FROM ( SELECT qa_photos.id as id,
                            qa_photos.url as url
                   ) r
          ),
          true
      )
  ) AS photos


  FROM qa_answers

  JOIN qa_photos
  ON qa_answers.answer_id = qa_photos.answer_id




`, [question_id])

  const result = {};
  result.question = question_id;
  result.page = page;
  result.count = count;
  result.results = rows;



  console.log(result);

  res.send(result)
})


[{"id":1,
 "url":"https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"}, {"id":2,
 "url":"https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"}, {"id":3,
 "url":"https://images.unsplash.com/photo-1500603720222-eb7a1f997356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80"}]
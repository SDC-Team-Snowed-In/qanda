const Router = require('express-promise-router')
const db = require('../db')
const router = new Router()
module.exports = router

// Example endpoint curl localhost:3000/qa/questions?product_id=18203&count=5&page=1


router.get('/', async (req, res) => {
  const { product_id } = req.query;
  let { count } = req.query;
  let limit = '';
  count ? limit = count.toString() : limit  = '5';
  let { page } = req.query;
  let offset = '';
  page ? offset = ((page -1) * limit).toString() : offset  = '0';
  console.log({product_id});
  console.log({count});
  console.log({page});

  try {
    const { rows } = await db.query(`
    SELECT
    qa_questions.question_id AS question_id,
    qa_questions.question_body AS question_body,
    qa_questions.question_date AS question_date,
    qa_questions.asker_name AS asker_name,
    qa_questions.question_helpfulness AS question_helpfulness,
    qa_questions.reported AS reported,
    (CASE
      WHEN subanswers.answers ISNULL
        THEN JSON_BUILD_OBJECT ()
      WHEN subanswers.answers IS NOT null
        THEN subanswers.answers
      END
    ) AS answers
    FROM qa_questions
    LEFT JOIN (
    SELECT
      qa_answers.question_id,
      JSON_OBJECT_AGG( qa_answers.answer_id,
        JSONB_BUILD_OBJECT (
          'id', qa_answers.answer_id,
          'body', qa_answers.body,
          'date',	qa_answers.date,
          'answerer_name', qa_answers.answerer_name,
          'helpfulness', qa_answers.helpfulness,
          'photos', array[]::varchar[]
          )
      )  AS answers
    FROM qa_answers
    GROUP BY qa_answers.question_id
    ) AS subanswers
    ON subanswers.question_id = qa_questions.question_id

    WHERE qa_questions.product_id = $1 AND reported = false
    LIMIT $2 OFFSET $3
    `, [product_id, limit, offset]);

    const result = {};
    result.product_id = product_id;
    result.results = rows;
    console.log(result);

    res.status(200).send(result);


  } catch(err) {
    console.log('Error processing request>>>>>', err);
    res.status(500).send('Error processing request');
  }
})
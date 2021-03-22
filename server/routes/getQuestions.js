const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

module.exports = router

// Example endpoint curl localhost:3000/qa/questions?product_id=18203&count=5&page=1


router.get('/', async (req, res) => {
  const { product_id } = req.query;
  const { count } = req.query;
  const { page } = req.query;
  console.log({product_id})
  console.log({count})
  console.log({page})

  const { rows } = await db.query(`
  SELECT qa_questions.question_id AS question_id,
	qa_questions.question_body AS question_body,
	qa_questions.question_date AS question_date,
	qa_questions.asker_name AS asker_name,
	qa_questions.question_helpfulness AS question_helpfulness,
	qa_questions.reported AS reported,
	(
	  SELECT
		JSONB_OBJECT_AGG(qa_answers.answer_id,
		  ROW_TO_JSON(
			  ( SELECT r
				  FROM ( SELECT qa_answers.answer_id as id,
								qa_answers.body as body,
								qa_answers.date as date,
								qa_answers.answerer_name as answerer_name,
								qa_answers.helpfulness as helpfulness,
						    array[]::varchar[] as photos
					   ) r
			  ),
			  true
		  )
	  ) AS answers
	  FROM qa_questions
	  LEFT JOIN qa_answers
	  ON qa_questions.question_id = qa_answers.question_id
	  WHERE qa_questions.product_id = $1
	)
  FROM qa_questions
  WHERE qa_questions.product_id = $1
  `, [product_id])

  const result = {};
  result.product_id = product_id;
  result.results = rows;

  console.log(result);

  res.status(200).send(result)
})
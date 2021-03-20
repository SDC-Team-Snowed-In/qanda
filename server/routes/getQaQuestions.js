const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

module.exports = router

router.get('/', async (req, res) => {
  const { product_id } = req.query;
  const { count } = req.query;
  const { page } = req.query;
  console.log(req.query)

  let { rows } = await db.query('SELECT * FROM qa_questions WHERE product_id = $1', [product_id])

  const result = {};
  result.product_id = product_id
  result.results = [];
  for (let i = 0; i < rows.length; i++) {
    let item = {
      question_id: rows[i].id,
      question_body: rows[i].question_body,
      question_date: rows[i].question_date,
      asker_name: rows[i].asker_name,
      question_helpfulness: rows[i].question_helpfulness,
      reported: false,
    }

    let answers = await db.query('SELECT * FROM qa_answers WHERE question_id = $1', [rows[i].id])
     console.log(answers.rows)

    result.results.push(item);
  }

  console.log(result);

  res.send(result)
})
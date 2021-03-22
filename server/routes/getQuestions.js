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



  let { rows } = await db.query(`
  SELECT qa_answers.answer_id AS answer_id, qa_answers.body AS body, qa_answers.date AS date, qa_answers.answerer_name AS answerer_name, qa_answers.helpfulness AS helpfulness
    FROM qa_answers WHERE a_answers.product_id = 1

  `, [product_id])

  const result = {};
  result.product_id = product_id
  result.results = [];


  console.log(result);

  res.send(result)
})
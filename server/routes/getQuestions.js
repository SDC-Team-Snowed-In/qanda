const Router = require('express-promise-router')
const db = require('../db')
const queries = require('../queries/getQuestions')
const router = new Router()
module.exports = router

// Example endpoint curl localhost:3000/qa/questions?product_id=18203&count=5&page=1
console.log()

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
    const { rows } = await db.query(queries.getQuestions, [product_id, limit, offset]);
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